import { produce } from "immer";
import { Collection, Db } from "mongodb";
import { mzDataMigrator_internalHelpers } from "./helpers";
import {
  IMzDbDataMigrationDefinition,
  IMzDbDataMigrationStep,
  IMzDbDataMigrator,
} from "./types";

const {
  raiseError,
  itemTo,
  getDateTimeText_yyyyMMddHHmmss,
  getFunctionBodyTextHash,
} = mzDataMigrator_internalHelpers;

type IDbRevisionEntity = {
  kind: "common" | "step";
  key: string;
  status: "running" | "applied" | "failed";
  timestamp: string;
};

export function createMzDbDataMigrator(): IMzDbDataMigrator {
  let db: Db;
  let def: IMzDbDataMigrationDefinition;
  let colRevision: Collection<IDbRevisionEntity>;

  const m = {
    async getDbRevisionCollection() {
      const collectionName = def.managementCollectionName ?? "db_migration";
      const colRevision = db.collection<IDbRevisionEntity>(collectionName);
      await colRevision.createIndex({ kind: 1, key: 1 }, { unique: true });
      return colRevision;
    },
    async applyMigrationRevision(
      kind: "common" | "step",
      key: string,
      fn: (db: Db) => Promise<void>
    ) {
      const timestamp = getDateTimeText_yyyyMMddHHmmss();
      await colRevision.insertOne({ kind, key, status: "running", timestamp });
      try {
        await fn(db);
        await colRevision.updateOne(
          { kind, key },
          { $set: { status: "applied", timestamp } }
        );
      } catch (error) {
        await colRevision.updateOne(
          { kind, key },
          { $set: { status: "failed", timestamp } }
        );
        throw error;
      }
    },
    async applyCommonSetup() {
      const key = def.commonSetup.key;
      const revision = await colRevision.findOne({ kind: "common", key });
      if (!revision) {
        await m.applyMigrationRevision(
          "common",
          key,
          def.commonSetup.operation
        );
        return true;
      }
      return false;
    },
    async applyMigrationSteps(steps: IMzDbDataMigrationStep[]) {
      const inputRevisionKeys = steps.map((it) => it.key);

      const existingRevisions = await colRevision
        .find({
          kind: "step",
          key: { $in: inputRevisionKeys },
        })
        .toArray();
      const existingRevisionKeys = existingRevisions.map(itemTo("key"));

      const newMigrationSteps = steps.filter(
        (it) => !existingRevisionKeys.includes(it.key)
      );
      for (const step of newMigrationSteps) {
        console.log(`apply migration step ${step.key}`);
        await m.applyMigrationRevision("step", step.key, step.operation);
      }
      return newMigrationSteps.length > 0;
    },
    async checkMigrationCommon() {
      const key = def.commonSetup.key;
      const revision = await colRevision.findOne({ kind: "common", key });
      if (!revision) {
        raiseError(
          `migration error. latest common revision is not applied yet`
        );
      }
    },
    async checkMigrationSteps(steps: IMzDbDataMigrationStep[]) {
      const revisionKeys = steps.map((it) => it.key);
      const revisions = await colRevision
        .find({ kind: "step", key: { $in: revisionKeys } })
        .toArray();
      const valid =
        revisions.length === steps.length &&
        revisions.every((it) => it.status === "applied");
      if (!valid) {
        raiseError(
          `migration error. some migration steps are missing or in failure state`
        );
      }
    },
  };

  return {
    setup(_def, isDevelopment) {
      local.checkInputMigrationSteps(_def.migrationsSteps);
      if (isDevelopment) {
        //ローカル開発環境では、マイグレーションキーに処理内容の関数を文字列化したもののハッシュ値を付与する
        //開発時にはマイグレーションキーを変更しなくても処理内容だけ書き換えて処理が実行されるようにする
        def = produce(_def, (draft) => {
          draft.commonSetup.key +=
            "_" + getFunctionBodyTextHash(draft.commonSetup.operation);
          for (const m of draft.migrationsSteps) {
            if (!m.locked) {
              m.key += "_" + getFunctionBodyTextHash(m.operation);
            }
          }
        });
      } else {
        def = _def;
      }
    },
    async migrateCold(_db) {
      db = _db;
      colRevision ??= await m.getDbRevisionCollection();
      await m.applyMigrationSteps(def.migrationsSteps);
      await m.applyCommonSetup();
      await m.checkMigrationSteps(def.migrationsSteps);
    },
    async migrateHot(_db) {
      db = _db;
      colRevision ??= await m.getDbRevisionCollection();
      const appliedM = await m.applyMigrationSteps(def.migrationsSteps);
      const appliedC = await m.applyCommonSetup();
      await m.checkMigrationSteps(def.migrationsSteps);
      return appliedC || appliedM;
    },
    async checkMigrations(_db) {
      db = _db;
      colRevision ??= await m.getDbRevisionCollection();
      await m.checkMigrationSteps(def.migrationsSteps);
      await m.checkMigrationCommon();
    },
    async clearInternalMigrationRecords() {
      colRevision ??= await m.getDbRevisionCollection();
      await colRevision.deleteMany({});
    },
  };
}

const local = {
  checkInputMigrationSteps(steps: IMzDbDataMigrationStep[]) {
    //!lockedの後にlockedがあるパターンを禁止
    //locked, locked, locked, !locked, !locked のような順序ならok
    const lastColdPos = steps.findLastIndex((it) => it.locked);
    const firstHotPos = steps.findIndex((it) => !it.locked);
    if (lastColdPos >= 0 && firstHotPos >= 0 && firstHotPos < lastColdPos)
      raiseError(`invalid migration step sequence`);
  },
};

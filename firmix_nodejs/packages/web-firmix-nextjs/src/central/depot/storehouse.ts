import { createMongoGeneralCabinet } from "@mx/auxiliaries/mongo_general_cabinet";
import { createMzDbDataMigrator } from "@mx/auxiliaries/mz_data_migrator/mod";
import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { AsyncReturnType } from "@mx/auxiliaries/utils/utility_types";
import { getEnvVariable } from "../base/envs";
import { connectToMongoDb, getCollections } from "./db_core";
import { migrationDefinition } from "./migrations";

if (typeof window !== "undefined") {
  raiseError(`invalid import, this code must not loaded in frontend`);
}

async function createStoreHouseImpl() {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    raiseError(`do not connect to db in build process`);
  }

  const mzDataMigrator = createMzDbDataMigrator();
  const isDevelopment = getEnvVariable("ENV_TYPE") === "development";
  mzDataMigrator.setup(migrationDefinition, isDevelopment);
  const db = await connectToMongoDb();
  if (isDevelopment) {
    await mzDataMigrator.migrateHot(db);
  } else {
    await mzDataMigrator.checkMigrations(db);
  }

  const { userCollection, projectCollection } = getCollections(db);

  const userCabinet = createMongoGeneralCabinet(userCollection, "userId");
  const projectCabinet = createMongoGeneralCabinet(
    projectCollection,
    "projectId"
  );
  return { userCollection, projectCollection, userCabinet, projectCabinet };
}

type Storehouse = AsyncReturnType<typeof createStoreHouseImpl>;

export const storehouse = {} as Storehouse;

let storehouseImplPromise: Promise<Storehouse>;

export async function storehouse_ensureDbConnected() {
  storehouseImplPromise ??= createStoreHouseImpl();
  const storehouseImpl = await storehouseImplPromise;
  if (Object.keys(storehouse).length === 0) {
    Object.assign(storehouse, storehouseImpl);
  }
}

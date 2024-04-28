import { IMzDbDataMigrationDefinition } from "@mx/auxiliaries/mz_data_migrator/types";
import { Db } from "mongodb";
import { getCollections } from "./db_core";

export const migrationDefinition: IMzDbDataMigrationDefinition = {
  commonSetup: {
    key: "001",
    async operation(db: Db) {
      const { userCollection, projectCollection } = getCollections(db);
      // userCollection.dropIndexes();
      // projectCollection.dropIndexes();
      await userCollection.createIndex({ userId: -1 }, { unique: true });
      await userCollection.createIndex(
        { loginSourceSignature: 1 },
        { unique: true }
      );
      await userCollection.createIndex({ apiKey: 1 }, { unique: true });

      await projectCollection.createIndex({ projectId: -1 }, { unique: true });
      await projectCollection.createIndex({ projectGuid: 1 }, { unique: true });
      await projectCollection.createIndex({ userId: 1 });
      await projectCollection.createIndex({ parentProjectId: 1 });
    },
  },
  migrationsSteps: [
    {
      key: "m240412_initial_data",
      locked: true,
      async operation(_db) {},
    },
  ],
};

import { createMzDbDataMigrator } from "@mx/auxiliaries/mz_data_migrator/mod";
import { raiseError } from "@mx/auxiliaries/utils/error_util";
import { createMongoGeneralCabinet } from "@mx/shared/central/mongo_general_cabinet";
import { getEnvVariable } from "../base/envs";
import { connectToMongoDb, getCollections } from "./db_core";
import { migrationDefinition } from "./migrations";

if (typeof window !== "undefined") {
  raiseError(`invalid import, this code must not loaded in frontend`);
}

export async function createStoreHouse() {
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

export const storehouse = (await createStoreHouse())!;

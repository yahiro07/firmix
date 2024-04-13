import { confirm } from "@inquirer/prompts";
import { createMzDbDataMigrator } from "auxiliaries/mz_data_migrator/mod";
import { raiseError } from "auxiliaries/utils/error_util";
import { getEnvVariable } from "../base/envs";
import { connectToMongoDb, mongoGlobal } from "../depot/db_core";
import { migrationDefinition } from "../depot/migrations";

async function executeColdMigration() {
  const mzDataMigrator = createMzDbDataMigrator();
  const isDevelopment = getEnvVariable("ENV_TYPE") === "development";
  mzDataMigrator.setup(migrationDefinition, isDevelopment);
  const db = await connectToMongoDb();
  await mzDataMigrator.migrateCold(db);
}

async function run() {
  const envType = getEnvVariable("ENV_TYPE");
  if (!envType) raiseError(`env variable ENV_TYPE undefined`);
  const dbUrl = getEnvVariable("MONGO_URL");
  const dbName = getEnvVariable("MONGO_DATABASE_NAME");
  if (!(dbUrl && dbName))
    raiseError(`lack env variables for MongoDB connection`);
  const message = `Going to execute migration for env:${envType} db:${dbName}. Are you ok?`;
  const ok = await confirm({ message });
  if (ok) {
    await executeColdMigration();
    await mongoGlobal.client?.close();
    console.log(`done.`);
  } else {
    console.log(`operation cancelled.`);
  }
}

await run();

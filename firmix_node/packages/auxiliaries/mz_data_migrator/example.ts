import { Db, MongoClient } from "mongodb";
import { createMzDbDataMigrator } from "./mod";
import { IMzDbDataMigrationDefinition } from "./types";

//This is an example code representing how to use maDataMigrator

async function setupIndices(db: Db) {
  //common setup function executed before migration steps.
  //if the content of this functions has changed, it is executed once after that.
  const userCollection = db.collection("user");
  const projectCollection = db.collection("project");
  await userCollection.createIndex({ userId: -1 }, { unique: true });
  await projectCollection.createIndex({ projectId: -1 }, { unique: true });
  await projectCollection.createIndex({ userId: 1 });
}

const migrationDefinition: IMzDbDataMigrationDefinition = {
  commonSetup: setupIndices,
  migrationsSteps: [
    {
      key: "000_initial_data",
      locked: true,
      async operation(db) {
        //if there are initial data, insert them to collections here.
      },
    },
    {
      key: "001_add_user_role",
      locked: true,
      async operation(db) {
        const userCollection = db.collection("user");
        userCollection.updateMany(
          { role: undefined },
          { $set: { role: "user" } }
        );
      },
    },
    {
      key: "002_change_user_default_role__WIP",
      locked: false, //modified operation body is affected on the fly in dev execution.
      //set locked:true after you completed debugging this step and committing the changes.
      async operation(db) {
        const userCollection = db.collection("user");
        userCollection.updateMany(
          { role: "user" },
          { $set: { role: "member" } }
        );
      },
    },
  ],
};

async function connectToMongoDb() {
  const client = new MongoClient(process.env.MONGO_URL!);
  await client.connect();
  const db = client.db(process.env.MONGO_DBNAME);
  return db;
}

//function expected to be called in the initialization on the app
async function connectToDatabaseInApp() {
  const mzDataMigrator = createMzDbDataMigrator();
  const isDevelopment = process.env.NODE_ENV === "development";
  mzDataMigrator.setup(migrationDefinition, isDevelopment);

  const db = await connectToMongoDb();
  if (!isDevelopment) {
    await mzDataMigrator.checkMigrations(db);
  } else {
    await mzDataMigrator.migrateHot(db);
  }
  return db;
}

//function expected to be called from the migration script executed separated from the main app
async function executeColdMigration() {
  const mzDataMigrator = createMzDbDataMigrator();
  const isDevelopment = process.env.NODE_ENV === "development";
  mzDataMigrator.setup(migrationDefinition, isDevelopment);
  const db = await connectToMongoDb();
  await mzDataMigrator.migrateCold(db);
}

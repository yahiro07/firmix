import { MongoClient } from "mongodb";
import { ProjectEntity, UserEntity } from "~/base/types_db_entity.ts";
import { getEnvVariable } from "~/central/base/envs.ts";
import { createMongoGeneralCabinet } from "~/central/depot/mongo_general_cabinet.ts";

async function createStoreHouse() {
  const mongoUrl = getEnvVariable("MONGO_URL");
  const mongoDatabaseName = getEnvVariable("MONGO_DATABASE_NAME");
  if (mongoUrl === "__dummy__") return undefined;
  const client = new MongoClient(mongoUrl);
  await client.connect();
  console.log("connected to db");
  const db = client.db(mongoDatabaseName);

  const userCollection = db.collection<UserEntity>("user");
  const projectCollection = db.collection<ProjectEntity>("project");

  const userCabinet = createMongoGeneralCabinet(userCollection, "userId");
  const projectCabinet = createMongoGeneralCabinet(
    projectCollection,
    "projectId"
  );

  userCollection.dropIndexes();
  projectCollection.dropIndexes();

  await userCollection.createIndex({ userId: -1 }, { unique: true });
  await userCollection.createIndex(
    { loginSourceSignature: 1 },
    { unique: true }
  );
  await userCollection.createIndex({ apiKey: 1 }, { unique: true });

  await projectCollection.createIndex({ projectId: -1 }, { unique: true });
  await projectCollection.createIndex({ projectGuid: 1 }, { unique: true });
  await projectCollection.createIndex({ userId: 1 });
  await projectCollection.createIndex({ realm: 1 });
  await projectCollection.createIndex({ parentProjectId: 1 });

  return { userCollection, projectCollection, userCabinet, projectCabinet };
}

export const storehouse = (await createStoreHouse())!;

import { MongoClient } from "mongodb";
import { ProjectEntity, UserEntity } from "~/base/types_db_entity.ts";
import { getEnvVariable } from "~/central/base/envs.ts";
import { createMongoGeneralCabinet } from "~/central/depot/mongo_general_cabinet.ts";

async function createStoreHouse() {
  const mongoUrl = getEnvVariable("MONGO_URL");
  const mongoDatabaseName = getEnvVariable("MONGO_DATABASE_NAME");
  const client = new MongoClient();
  await client.connect(mongoUrl);
  console.log("connected to db");
  const db = client.database(mongoDatabaseName);

  const userCollection = db.collection<UserEntity>("user");
  const projectCollection = db.collection<ProjectEntity>("project");

  const userCabinet = createMongoGeneralCabinet(userCollection, "userId");
  const projectCabinet = createMongoGeneralCabinet(
    projectCollection,
    "projectId"
  );

  await userCollection.createIndexes({
    indexes: [
      { key: { userId: -1 }, name: "user_id", unique: true },
      {
        key: { loginSourceSignature: 1 },
        name: "login_source_signature",
        unique: true,
      },
      { key: { apiKey: 1 }, name: "api_key", unique: true },
    ],
  });

  // await colProject.createIndex({ projectId: -1 }, { unique: true });
  // await colProject.dropIndexes({ index: "projectId_-1" });
  await projectCollection.createIndexes({
    indexes: [
      { key: { projectId: -1 }, name: "project_id", unique: true },
      { key: { projectGuid: 1 }, name: "project_guid", unique: true },
      { key: { userId: 1 }, name: "user_id" },
    ],
  });

  return { userCollection, projectCollection, userCabinet, projectCabinet };
}

export const storehouse = await createStoreHouse();

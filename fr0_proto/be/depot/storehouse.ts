import { MongoClient } from "mongodb";
import { getEnvVariable } from "~/aux/utils_be/env_helper.ts";
import { ProjectEntity } from "~/base/types_db_entity.ts";
import { createMongoGeneralCabinet } from "./mongo_general_cabinet.ts";

async function createStoreHouse() {
  const mongoUrl = getEnvVariable("MONGO_URL");
  const mongoDatabaseName = getEnvVariable("MONGO_DATABASE_NAME");
  const client = new MongoClient();
  await client.connect(mongoUrl);
  console.log("connected to db");
  const db = client.database(mongoDatabaseName);

  const colProject = db.collection<ProjectEntity>("project");
  const projectCabinet = createMongoGeneralCabinet(colProject, "projectId");

  // await colProject.createIndex({ projectId: -1 }, { unique: true });
  // await colProject.dropIndexes({ index: "projectId_-1" });
  await colProject.createIndexes({
    indexes: [
      { key: { projectId: -1 }, name: "project_id", unique: true },
      { key: { projectGuid: 1 }, name: "project_guid", unique: true },
    ],
  });

  return { colProject, projectCabinet };
}

export const storehouse = await createStoreHouse();

import { MongoClient } from "mongodb";
import { raiseError } from "~/aux/utils/error_util.ts";
import { ProjectEntity } from "~/base/entity_types.ts";
import { createMongoGeneralCabinet } from "~/server/depot/mongo_general_cabinet.ts";

async function createStoreHouse() {
  const mongoSpec = Deno.env.get("MONGO_SPEC");
  if (!mongoSpec) raiseError("env variable MONGO_SPEC undefined");
  const [uri, dbName] = mongoSpec.split("|");
  if (!dbName) raiseError("invalid MONGO_SPEC format.");
  const client = new MongoClient(uri);
  await client.connect();
  console.log("connected to db");
  const db = client.db(dbName);

  const colProject = db.collection<ProjectEntity>("project");
  const projectCabinet = createMongoGeneralCabinet(colProject, "projectId");

  await colProject.createIndex({ projectId: -1 }, { unique: true });

  return { colProject, projectCabinet };
}

export const storeHouse = await createStoreHouse();

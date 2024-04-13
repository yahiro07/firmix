import { Db, MongoClient } from "mongodb";
import { ProjectEntity, UserEntity } from "../../base/types_db_entity";
import { getEnvVariable } from "../base/envs";

export const mongoGlobal = {
  client: undefined as MongoClient | undefined,
};

export async function connectToMongoDb(): Promise<Db> {
  const mongoUrl = getEnvVariable("MONGO_URL");
  const mongoDatabaseName = getEnvVariable("MONGO_DATABASE_NAME");
  const client = new MongoClient(mongoUrl);
  await client.connect();
  console.log("connected to db");
  mongoGlobal.client = client;
  const db = client.db(mongoDatabaseName);
  return db;
}

export function getCollections(db: Db) {
  const userCollection = db.collection<UserEntity>("user");
  const projectCollection = db.collection<ProjectEntity>("project");
  return { userCollection, projectCollection };
}

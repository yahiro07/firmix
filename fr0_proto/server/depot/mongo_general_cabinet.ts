import { Collection } from "mongodb";
import { checkNonNull } from "~/aux/utils/error_util.ts";

type MongoGeneralCabinet<T extends object> = {
  insert(entity: T): Promise<void>;
  upsert(entity: T): Promise<void>;
  get(id: string): Promise<T>;
  getMaybe(id: string): Promise<T | undefined>;
  getOrDefault(id: string, fallback: T): Promise<T>;
  patch(id: string, attrs: Partial<T>): Promise<void>;
  patchMany(ids: string[], attrs: Partial<T>): Promise<void>;
  delete(id: string): Promise<void>;
  getMany(ids: string[]): Promise<T[]>;
};

export function createMongoGeneralCabinet<T extends object>(
  collection: Collection<T>,
  idFieldName: keyof T
): MongoGeneralCabinet<T> {
  return {
    async insert(entity) {
      await collection.insertOne(entity as any);
    },
    async upsert(entity) {
      const id = entity[idFieldName];
      await collection.updateOne(
        { [idFieldName]: id } as any,
        { $set: entity } as any,
        { upsert: true }
      );
    },
    async get(id) {
      return checkNonNull(
        await collection.findOne({ [idFieldName]: id } as any),
        { [idFieldName]: id }
      ) as any as T;
    },
    async getMaybe(id) {
      return (await collection.findOne({ [idFieldName]: id } as any),
      { [idFieldName]: id }) as any as T;
    },
    async getOrDefault(id, fallback) {
      return (
        ((await collection.findOne({ [idFieldName]: id } as any)) as T) ??
        fallback
      );
    },
    async patch(id, attrs) {
      await collection.updateOne(
        { [idFieldName]: id } as any,
        { $set: attrs } as any
      );
    },
    async patchMany(ids, attrs) {
      await collection.updateMany(
        { [idFieldName]: { $in: ids } } as any,
        { $set: attrs } as any
      );
    },
    async delete(id) {
      await collection.deleteOne({ [idFieldName]: id } as any);
    },
    async getMany(ids) {
      return (await collection
        .find({ [idFieldName]: { $in: ids } } as any)
        .toArray()) as T[];
    },
  };
}

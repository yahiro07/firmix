import * as idb_key_val from "https://unpkg.com/idb-keyval@5.0.2/dist/esm/index.js";

export function createLocalStorageAdapter<T>(key: string) {
  return {
    write(data: T | undefined) {
      if (data === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
    },
    read(): T | undefined {
      const text = localStorage.getItem(key);
      if (text !== null) {
        try {
          const obj = JSON.parse(text);
          return obj as T;
        } catch (err) {
          console.error(err);
        }
      }
      return undefined;
    },
  };
}

export function createIndexedDbStorageAdapter<T>(key: string) {
  return {
    async write(data: T | undefined) {
      await idb_key_val.set(key, data);
    },
    async read(): Promise<T | undefined> {
      return await idb_key_val.get(key);
    },
  };
}

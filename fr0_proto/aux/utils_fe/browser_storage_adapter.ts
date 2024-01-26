import * as idb_keyval from "idb-keyval";

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
      await idb_keyval.set(key, data);
    },
    async read(): Promise<T | undefined> {
      return await idb_keyval.get(key);
    },
  };
}

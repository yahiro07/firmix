import { useEffect, useMemo, useState } from "react";
import { reasyModuleHelpers } from "./reasy_module_helpers";

const { getObjectKeys, capitalizeFirstLetter } = reasyModuleHelpers;

export type IMutations<T> = {
  [K in keyof T as `set${Capitalize<K & string>}`]: (
    value: T[K] | ((prev: T[K]) => T[K])
  ) => void;
} & {
  set(value: Partial<T>): void;
};

export function useReasyState<T extends {}>(
  initialState: T,
  deps: any[] = []
): [T, IMutations<T>] {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (initialState !== state) {
      setState(initialState);
    }
  }, deps);

  const mutations = useMemo(() => {
    const keys = getObjectKeys(initialState);
    const setters = Object.fromEntries(
      keys.map((key) => {
        const setterKey = `set${capitalizeFirstLetter(key)}`;
        return [
          setterKey,
          (value: any) => {
            if (typeof value === "function") {
              const fn = value;
              setState((prev) => ({ ...prev, [key]: fn(prev[key]) }));
            } else {
              setState((prev) => ({ ...prev, [key]: value }));
            }
          },
        ];
      })
    );
    const set = (attrs: Partial<T>) =>
      setState((prev) => ({ ...prev, ...attrs }));

    return { ...setters, set } as IMutations<T>;
  }, [state]);

  return [state, mutations];
}

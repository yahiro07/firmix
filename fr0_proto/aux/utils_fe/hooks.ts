import { useEffect } from "preact/hooks";

export function useEffectAsync(fn: () => Promise<any>, deps?: any[]) {
  useEffect(() => {
    void fn();
  }, deps);
}

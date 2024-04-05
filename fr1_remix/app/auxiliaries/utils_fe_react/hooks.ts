import { useEffect } from "~/auxiliaries/fe-deps-react";

export function useEffectAsync(fn: () => Promise<any>, deps?: any[]) {
  useEffect(() => {
    void fn();
  }, deps);
}

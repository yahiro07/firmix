import { useEffect } from "react";

export function useEffectAsync(fn: () => Promise<any>, deps?: any[]) {
  useEffect(() => {
    void fn();
  }, deps);
}

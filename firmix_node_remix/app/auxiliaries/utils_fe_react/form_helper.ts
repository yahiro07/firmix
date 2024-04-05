import { SyntheticEvent } from "~/auxiliaries/fe-deps-react";

export type DomEvent<T> = Event & { currentTarget: T };

export function reflectInputText(destFn: (text: string) => void) {
  return (
    e: SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    destFn(e.currentTarget.value);
  };
}

export function reflectInputChecked(destFn: (checked: boolean) => void) {
  return (e: SyntheticEvent<HTMLInputElement>) => {
    destFn(e.currentTarget.checked);
  };
}

export type DomEvent<T> = Event & { currentTarget: T };

export function reflectInputText(destFn: (text: string) => void) {
  return (
    e: DomEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    destFn(e.currentTarget.value);
  };
}

export function reflectInputChecked(destFn: (checked: boolean) => void) {
  return (e: DomEvent<HTMLInputElement>) => {
    destFn(e.currentTarget.checked);
  };
}

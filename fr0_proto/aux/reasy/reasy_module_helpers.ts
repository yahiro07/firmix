export namespace reasyModuleHelpers {
  export function getObjectKeys<T extends {}>(
    obj: T,
  ): Extract<keyof T, string>[] {
    return Object.keys(obj) as Extract<keyof T, string>[];
  }

  export function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}

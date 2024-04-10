import { generateRandomId } from "auxiliaries/utils_be/id_generator.ts";

export const userHelper = {
  generateNewApiKey() {
    return generateRandomId(32);
  },
};

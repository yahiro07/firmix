import { generateRandomId } from "@mx/auxiliaries/utils_be/id_generator";

export const userHelper = {
  generateNewApiKey() {
    return generateRandomId(32);
  },
};

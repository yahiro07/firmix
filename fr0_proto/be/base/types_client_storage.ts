import { LoginUserClue } from "~/base/types_dto_internal.ts";

export type CookieOutputJob =
  | { op: "writeLoginUserClue"; loginUserClue: LoginUserClue }
  | { op: "clearLoginUserClue" };

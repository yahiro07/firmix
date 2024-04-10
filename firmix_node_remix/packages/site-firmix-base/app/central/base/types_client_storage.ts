import { CoactiveState } from "~/base/types_dto.ts";
import { LoginUserClue } from "~/base/types_dto_internal.ts";

export type CookieOutputJob =
  | { op: "writeLoginUserClue"; loginUserClue: LoginUserClue }
  | { op: "clearLoginUserClue" }
  | { op: "writeCoactiveState"; coactiveState: CoactiveState };
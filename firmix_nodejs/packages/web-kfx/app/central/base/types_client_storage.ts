import { CoactiveState } from "@mx/web-kfx/app/base/types_dto";
import { LoginUserClue } from "@mx/web-kfx/app/base/types_dto_internal";

export type CookieOutputJob =
  | { op: "writeLoginUserClue"; loginUserClue: LoginUserClue }
  | { op: "clearLoginUserClue" }
  | { op: "writeCoactiveState"; coactiveState: CoactiveState };

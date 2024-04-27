import { copyObjectMembers } from "@mx/auxiliaries/utils/utils_general";
import {
  getDocumentCookieValue,
  setDocumentCookie,
} from "@mx/auxiliaries/utils_fe/document_cookie_helper";
import { appConfig } from "../base/app_config";
import { fallbackValues } from "../base/fallback_values";
import { CoactiveState } from "../base/types_dto";

export const coactiveStateWriter = {
  setValue(attrs: Partial<CoactiveState>) {
    const state = local.readCoactiveState();
    local.copyAttributes(state, attrs);
    local.writeCoactiveState(state);
  },
};

const local = {
  copyAttributes(dest: CoactiveState, src: Partial<CoactiveState>) {
    copyObjectMembers(dest, src, ["homeTargetRealm_deprecated"]);
  },
  readCoactiveState(): CoactiveState {
    const cookieKey = appConfig.coactiveStateCookieKey;
    const state = structuredClone(fallbackValues.coactiveState);
    const text = getDocumentCookieValue(cookieKey);
    if (text) {
      try {
        const loadedObj = JSON.parse(atob(text));
        local.copyAttributes(state, loadedObj);
      } catch (_) {
        //ignore
      }
    }
    return state;
  },
  writeCoactiveState(state: CoactiveState) {
    const cookieKey = appConfig.coactiveStateCookieKey;
    const text = btoa(JSON.stringify(state));
    setDocumentCookie(cookieKey, text);
    document.cookie = `${cookieKey}=${text};path=/;max-age=${86400 * 365}`;
  },
};

import { copyObjectMembers } from "auxiliaries/utils/utils_general.ts";
import {
  getDocumentCookieValue,
  setDocumentCookie,
} from "auxiliaries/utils_fe/document_cookie_helper.ts";
import { appConfig } from "~/base/app_config.ts";
import { fallbackValues } from "~/base/fallback_values.ts";
import { CoactiveState } from "~/base/types_dto.ts";

export const coactiveStateWriter = {
  setValue(attrs: Partial<CoactiveState>) {
    const state = local.readCoactiveState();
    local.copyAttributes(state, attrs);
    local.writeCoactiveState(state);
  },
};

const local = {
  copyAttributes(dest: CoactiveState, src: Partial<CoactiveState>) {
    copyObjectMembers(dest, src, ["homeTargetRealm"]);
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
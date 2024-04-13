import { copyObjectMembers } from "auxiliaries/utils/utils_general";
import {
  getDocumentCookieValue,
  setDocumentCookie,
} from "auxiliaries/utils_fe/document_cookie_helper";
import { appConfig } from "web-kfx/app/base/app_config";
import { fallbackValues } from "web-kfx/app/base/fallback_values";
import { CoactiveState } from "web-kfx/app/base/types_dto";

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

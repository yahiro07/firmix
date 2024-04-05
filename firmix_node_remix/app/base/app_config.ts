export const appConfig = {
  versionCode: "240406c",
  isDevelopment:
    typeof Window === "undefined"
      ? process.env.ENV_TYPE === "development"
      : location.hostname === "localhost",
  thumbnail_maxFileSize: 400000,
  thumbnail_maxWidth: 320,
  thumbnail_maxHeight: 240,
  coactiveStateCookieKey: "fr0_coactive_state",
  defaultRealm: "keyboard" as const,
};
console.log(`version ${appConfig.versionCode}`);

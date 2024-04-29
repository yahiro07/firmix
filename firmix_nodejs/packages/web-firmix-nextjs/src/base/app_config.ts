export const appConfig = {
  versionCode: "firmix-nextjs-240429a",
  isDevelopment:
    typeof Window === "undefined"
      ? process.env.ENV_TYPE === "development"
      : location.hostname === "localhost",
  thumbnail_maxFileSize: 400000,
  thumbnail_maxWidth: 320,
  thumbnail_maxHeight: 240,
  coactiveStateCookieKey: "fr0_coactive_state",
};
console.log(`version ${appConfig.versionCode}`);

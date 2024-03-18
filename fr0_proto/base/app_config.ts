export const appConfig = {
  versionCode: "240318",
  isDevelopment:
    typeof Deno !== "undefined"
      ? Deno.env.get("ENV_TYPE") === "development"
      : location.hostname === "localhost",
  thumbnail_maxFileSize: 400000,
  thumbnail_maxWidth: 320,
  thumbnail_maxHeight: 240,
  coactiveStateCookieKey: "fr0_coactive_state",
};
console.log(`version ${appConfig.versionCode}`);

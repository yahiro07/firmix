export const appConfig = {
  versionCode: "240131a",
  isDevelopment:
    typeof Deno !== "undefined"
      ? Deno.env.get("ENV_TYPE") === "development"
      : location.hostname === "localhost",
  thumbnail_maxFileSize: 400000,
  thumbnail_maxWidth: 320,
  thumbnail_maxHeight: 240,
};
console.log(`version ${appConfig.versionCode}`);

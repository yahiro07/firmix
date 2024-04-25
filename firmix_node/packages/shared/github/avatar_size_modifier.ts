export function specifyGithubAvatarUrlSize(avatarUrl: string, size: number) {
  const url = new URL(avatarUrl);
  url.searchParams.set("s", size.toString());
  return url.toString();
}

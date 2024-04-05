export const uiSystem = {
  navigateTo(path: string) {
    location.href = path;
  },
  reload() {
    location.reload();
  },
};

export function setTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--text", theme.text);
}

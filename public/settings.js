export function setTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--text", theme.text);
}
export function saveTheme() {
  const themeColor = document.querySelectorAll(".colorBtn");
  themeColor.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = JSON.parse(btn.dataset.theme);
      setTheme(theme);
    });
  });
}

"use strict";
export function setTheme(theme) {
  document.documentElement.style.setProperty("--bg", theme.bg);
  document.documentElement.style.setProperty("--text", theme.text);
}
//Lyssnar på knapptryck och sparar temat lokalt, spökar lite om man ändrar temat i browsern atm
export function saveTheme() {
  const themeColor = document.querySelectorAll(".colorBtn");
  themeColor.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = JSON.parse(btn.dataset.theme);
      setTheme(theme);
      localStorage.setItem("theme", JSON.stringify(theme));
    });
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(JSON.parse(savedTheme));
  }
}

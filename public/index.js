"use strict";

const startMenu = document.getElementById("startMenu");
const categorySelect = document.getElementById("categorySelect");
const startBtn = document.getElementById("startBtn");
const settingsBtn = document.getElementById("settingsBtn"); //TODO ändra färger i menyn?
const settingScreen = document.getElementById("settingScreen");
const quizScreen = document.getElementById("quizScreen");
const questionDiv = document.getElementById("question");
const nextBtn = document.getElementById("nextBtn");
const optionsDiv = document.getElementById("options");
const backBtn = document.getElementById("backBtn");
function showQuestion() {
  const q = questions[currentIndex];
  questionDiv.textContent = q.question;
}

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

  optionsDiv.innerHTML = "";
  for (const key in q.options) {
    const option = q.options[key];

    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = key;

    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    optionsDiv.appendChild(label);
    optionsDiv.appendChild(document.createElement("br"));
  }
}
}

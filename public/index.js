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
const categories = ["countries", "animals"];
let questions = [];
let selectedCategory = "countries";
let currentIndex = 0;
//Startar quizet
startBtn.addEventListener("click", async () => {
  selectedCategory = categorySelect.value;
  startMenu.classList.add("hide");
  quizScreen.classList.add("show");

  try {
    questions = await fetchQuestions(selectedCategory);
    currentIndex = 0;
    score = 0;
    showQuestion();
  } catch (error) {
    alert("Kunde inte hämta frågor");
  }
});
async function fetchQuestions(category) {
  if (category === "mixed") {
    const results = await Promise.all(
      categories.map(async (cate) => {
        const res = await fetch(`/api/quiz/${cate}`);
        const data = await res.json();
        return data.map((q) => ({ ...q, category: cate })); // .map skapar en ny array genom att köra en given funktion på varje element i en befintlig array och returnera resultatet.
      })
    );
    return shuffle(results.flat()); // .flat plattar ut en kapslad array genom att sammanfoga dess underarrayer till en ny array, orginalet lämnas orörd
  } else {
    const res = await fetch(`/api/quiz/${category}`);
    const data = await res.json();
    return shuffle(data.map((q) => ({ ...q, category })));
  }
}

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

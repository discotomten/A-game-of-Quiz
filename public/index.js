"use strict";
import { saveTheme } from "./settings.js";

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
const restartBtn = document.getElementById("restartBtn");
const returnHome = document.getElementById("returnHome");

const categories = ["geography", "animals", "music", "sport"];
let questions = [];
let selectedCategory = "countries";
let score = 0;
let currentIndex = 0;
if (returnHome) {
  returnHome.addEventListener("click", () => {
    window.location.href = "/";
  });
}
//Settings dyker upp
if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    startMenu.classList.add("hide");
    settingScreen.classList.add("show");
    saveTheme();
  });
}
//Tillbaka till startmeny
if (backBtn) {
  backBtn.addEventListener("click", () => {
    settingScreen.classList.remove("show");
    startMenu.classList.remove("hide");
  });
}
//Startar quizet
if (startBtn) {
  startBtn.addEventListener("click", async () => {
    selectedCategory = categorySelect.value;
    startMenu.classList.add("hide");
    quizScreen.classList.add("show");

    try {
      questions = await fetchQuestions(selectedCategory);
      currentIndex = 0;
      score = 0;
      console.log("Questions:", questions); //Tillfällig
      console.log("Current index:", currentIndex); // Tillfällig
      showQuestion();
    } catch (error) {
      console.error("Fel vid hämtning av frågor:", error);
      alert("Kunde inte hämta frågor");
    }
  });
}
//Hämtar frågor från kategorier och blandar dom innan dom visas oavsett om man väljer mixat eller vanlig quiz
async function fetchQuestions(category) {
  if (category === "mixed") {
    const results = await Promise.all(
      categories.map(async (cate) => {
        const res = await fetch(`/api/quiz/${cate}`);
        const data = await res.json();
        return data.map((q) => ({ ...q, category: cate })); // .map skapar en ny array genom att köra en given funktion på varje element i en befintlig array och returnera resultatet.
      })
    );

    return shuffle(results.flat()).slice(0, 10); // .flat plattar ut en kapslad array genom att sammanfoga dess underarrayer till en ny array, orginalet lämnas orörd
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
if (nextBtn) {
  nextBtn.addEventListener("click", async () => {
    const selected = document.querySelector(`input[name="answer"]:checked`);
    if (!selected) {
      alert("Välj ett svar");
      return;
    }
    try {
      const currentQuestion = questions[currentIndex];

      const res = await fetch(`/api/quiz/${currentQuestion.category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          answer: selected.value,
        }),
      });

      const data = await res.json();

      if (data.correct) {
        alert("Rätt! + 100 poäng");
        score += 100;
        console.log(score);
      } else {
        alert("Fel! - 30 poäng");
        score -= 30;
        console.log(score);
      }

      currentIndex++;
      if (currentIndex < questions.length) showQuestion();
      else {
        alert(`Du fick totalt ${score} poäng, bra jobbat!`);
        restartBtn.classList.add("show");
        document.getElementById("restartBtn").addEventListener("click", () => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Fel vid POST");
      alert("Kunde inte skicka svaret.");
    }
  });
}
//En riktig shuffle med Fisher-Yates vad det nu betyder
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

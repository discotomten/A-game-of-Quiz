"use strict";
import { saveTheme } from "./settings.js";

const startMenu = document.getElementById("startMenu");
const categorySelect = document.getElementById("categorySelect");
const startBtn = document.getElementById("startBtn");
const changeThemeBtn = document.getElementById("settingsBtn");
const settingScreen = document.getElementById("settingScreen");
const quizScreen = document.getElementById("quizScreen");
const questionDiv = document.getElementById("question");
const nextBtn = document.getElementById("nextBtn");
const optionsDiv = document.getElementById("options");
const backBtn = document.getElementById("backBtn");
const restartBtn = document.getElementById("restartBtn");
const returnHome = document.getElementById("returnHome");
const createAccountBtn = document.getElementById("createAccount");
const createUser = document.getElementById("createUser");
const navigateLoginPage = document.getElementById("login");
const categories = ["geography", "animals", "music", "sport"];
const loginError = document.getElementById("login-error-msg");
const loginBtn = document.getElementById("login-form-submit");
const loginForm = document.getElementById("login-form");
const loginBackBtn = document.getElementById("createUserBack");
let questions = [];
let selectedCategory = "countries";
let score = 0;
let currentIndex = 0;
if (loginBackBtn) {
  loginBackBtn.addEventListener("click", () => {
    window.location.href = "/";
  });
}
if (returnHome) {
  document.querySelectorAll(".return").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "/";
    });
  });
}
//Settings dyker upp
if (changeThemeBtn) {
  changeThemeBtn.addEventListener("click", () => {
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
  //Logga in sidan dyker upp
  if (navigateLoginPage) {
    navigateLoginPage.addEventListener("click", () => {
      window.location.href = "/userLogin.html";
    });
  }
}
// if (loginBtn) {
//   loginBtn.addEventListener("click", () => {
//     await fetch("/api/login", {
//       method: "POST",
//       header: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username,
//       password,
//     }),
//   });
// }
// }else{
//   loginError.style.opacity = 1
// }

if (createAccountBtn) {
  createAccountBtn.addEventListener("click", () => {
    window.location.href = "/createUser.html";
  });
}
//Skapar en ny användare på sidan
if (createUser) {
  createUser.addEventListener("click", async () => {
    const user = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      alert("Nytt konto skapades! Nu kan du logga in.");
      window.location.href = "/";
    } catch (error) {
      console.error("Fel vid skapande av användare", error);
      if (409) {
        alert("Användaren finns redan!");
      } else if (400) {
        alert("Ogiltigt mejl-format eller alla fält ej ifyllda!");
      } else {
        alert("Bra jobbat, du förstörde sidan.");
      }
    }
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
//Hämtar frågor från kategorier och blandar dom innan dom visas oavsett om man väljer mixad kategori eller vanlig
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
  }
  // Om inte mixed är valet så hämtas kategorin och blandas innan dom visas
  else {
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
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
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
      console.error("Fel vid POST", error.message);
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

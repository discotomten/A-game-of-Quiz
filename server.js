"use strict";
import express from "express";
import { questions } from "./server/data/questions.js";
import path from "path";
import { fileURLToPath } from "url";
import {
  getUsers,
  saveUsers,
  readQuestion,
  saveQuestion,
} from "./server/userhandler.js";
import { isValidEmail } from "./server/formats.js";
import bcrypt from "bcrypt";

const port = 80;

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const app = express();
app.use(express.json());

app.use(express.static("public"));

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const users = await getUsers();

    const existingUser = users.find((u) => u.username === username);

    if (!existingUser) {
      return res.status(401).send("Fel användarnamn eller lösenord"); // 401 = Unauthorized
    }

    const isValidPw = await bcrypt.compare(
      password,
      existingUser.hashedPassword,
    );

    if (!isValidPw) {
      return res.status(401).send("Fel användarnamn eller lösenörd");
    }
    res.status(200).json("Inloggad");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check för att se om något fällt är tomt
  if ([username, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).send("All fields are required"); // 400 = Bad request
  }
  if (!isValidEmail(email)) {
    return res.status(400).send("Invalid email format");
  }
  const users = await getUsers();
  const existingUser = users.find(
    (u) => u.username === username || u.email === email,
  );
  if (existingUser) {
    return res.status(409).send("User already exists"); // 409 = Conflict
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    username,
    email,
    hashedPassword,
  };
  users.push(newUser);
  await saveUsers(users);
  res.status(201).json({ message: "User created successfully" });
});

//category är en platshållare som matchar vad som helst i den positionen t.ex. animals
app.get("/api/quiz/:category", (req, res) => {
  const { category } = req.params;
  const getQuestions = questions[category];

  console.log("QUESTIONS", questions);
  console.log("CATEGORY", category);
  if (!getQuestions) {
    return res.status(404).send("Category not found");
  }
  res.json(getQuestions);
});

//Rättar svaret som angivs true or false
app.post("/api/quiz/:category", (req, res) => {
  const { category } = req.params;
  const { questionId, answer } = req.body;

  const getQuestions = questions[category];

  if (!getQuestions) {
    return res.status(404).json("Category not found");
  }
  try {
    const question = getQuestions.find((q) => q.id === Number(questionId));
    if (!question) {
      return res.status(404).send("Question not found");
    }
    res.json({
      correct: answer === question.correct,
    });
  } catch (err) {
    console.error(err);
    res.status("Could not validate answer");
  }
});

//Lägger till frågor beroende på kategori
app.post("/api/quiz//add", async (req, res) => {
  const { category } = req.params;
  const { question, options, correct } = req.body;
  if (!question || !options || !correct) {
    return res.status(400).json({ error: "Invalid data" });
  }
  try {
    const questions = await readQuestion();

    if (!questions[category]) {
      return res.status(404).json({ error: "Category not found" });
    }
    const newId =
      questions[category].length > 0
        ? questions[category][questions[category].length - 1].id + 1
        : 1;

    const newQuestion = { id: newId, question, options, correct };
    questions[category].push(newQuestion);
    await saveQuestion(questions);
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error(err);
    res.status(500).json(" Could not save question");
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(dirName, "public", "404.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Answer check for custom made questions
export async function customQuestions(category, questionId, answer) {
  const questions = await readQuestion();
  if (!questions[category]) {
    return { error: "Category not found" };
  }
  const question = questions[category].find((q) => q.id === Number(questionId));
  if (!question) {
    return { error: "Question not found" };
  }
  return { correct: answer === question.correct };
}

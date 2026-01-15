"use strict";
import express from "express";
//import questions from "./server/data/questions.json";
import path from "path";
import { fileURLToPath } from "url";
import {
  getUsers,
  saveUsers,
  readQuestion,
  saveQuestion,
} from "./server/userhandler.js";
import { simpleHash, isValidEmail, compareHash } from "./server/formats.js";

const port = 80;

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const app = express();
app.use(express.json());

app.use(express.static("public"));

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await getUsers();
  const existingUser = users.find((u) => u.username === username);
  if (!existingUser) {
    return res.status(401).send("Fel användarnamn eller lösenord"); // 401 = Unauthorized
  }
  //TODO MÅSTE LÖSA HASHED PASSWORD
  // const isValidPw = await compareHash(password, users.hashedPassword);
  // console.log(password);
  // console.log(users.hashedPassword);
  // if (!isValidPw) {
  //   return res.status(401).send("Fel användarnamn eller lösenörd");
  // }
  res.status(200).json("Inloggad");
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
    (u) => u.username === username || u.email === email
  );
  if (existingUser) {
    return res.status(409).send("User already exists"); // 409 = Conflict
  }
  const hashedPassword = await simpleHash(password);
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
app.get("/api/quiz/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const questions = await readQuestion();
    console.log("QUESTIONS", questions);
    console.log("CATEGORY", category);
    if (!questions) {
      return res.status(404).send("Category not found");
    }
    res.json(questions[category]);
  } catch (err) {
    console.error(err);
    res.status(500).json("Could not read questions");
  }
});

  const { category } = req.params;
  const { questionId, answer } = req.body;
  const getQuestions = questions[category];
  if (!getQuestions) {
    return res.status(404).send("Category not found");
  }
  const question = getQuestions.find((q) => q.id === Number(questionId));
  if (!question) {
    return res.status(404).send("Question not found");
  }
  res.json({
    correct: answer === question.correct,
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(dirName, "public", "404.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

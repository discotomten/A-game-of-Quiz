"use strict";
import express from "express";
import questions from "./server/data/questions.js";
import path from "path"; // path är ett inbyggt node-paket, används för att bygga paths säkert
import { fileURLToPath } from "url";
import { getUsers, saveUsers } from "./server/userhandler.js";
import { simpleHash, isValidEmail } from "./server/formats.js";

const port = 80;

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const app = express();
app.use(express.json());

app.use(express.static("public"));

app.post("/api/register", async (req, res) => {
  //Hämtar data från body och bryter ner det till individuella delar
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
});
//category är en platshållare som matchar vad som helst i den positionen t.ex. animals
app.get("/api/quiz/:category", (req, res) => {
  const { category } = req.params;
  const getQuestions = questions[category];
  res.json(getQuestions);
});

app.post("/api/quiz/:category", (req, res) => {
  const { category } = req.params;
  const { questionId, answer } = req.body;
  const getQuestions = questions[category];

  const question = getQuestions.find((q) => q.id === Number(questionId));

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

"use strict";
import express from "express";
import questions from "./server/data/questions.js";
import path from "path"; // path är ett inbyggt node-paket, används för att bygga paths säkert
import { fileURLToPath } from "url";

const port = 80;

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const app = express();
app.use(express.json());

app.use(express.static("public"));

//category är en platshållare som matchar vad som helst i den positionen t.ex. animals
app.get("/api/quiz/:category", (req, res) => {
  const { category } = req.params;
  const getQuestions = questions[category];

  if (!getQuestions) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(getQuestions);
});

app.post("/api/quiz/:category", (req, res) => {
  const { category } = req.params;
  const { questionId, answer } = req.body;
  const getQuestions = questions[category];

  if (!getQuestions) {
    return res.status(404).json({ error: "Category not found" });
  }

  const question = getQuestions.find((q) => q.id === Number(questionId));
  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  res.json({
    correct: answer === question.correct,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

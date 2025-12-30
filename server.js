"use strict";
import express from "express";
const port = 80;

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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

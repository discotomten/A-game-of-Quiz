"use strict";
import express from "express";
const port = 80;

const app = express();
app.use(express.json());

app.use(express.static("public"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

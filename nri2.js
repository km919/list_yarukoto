"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); 

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) {
    return res.status(400).json({ error: "All fields are required" });
  }

  tasks.push({ name, date, time });

  const year = date.split("-")[0];
  const dayMonth = date.split("-").slice(1).join("/");
  console.log(`リストに追加: ${year}年 ${dayMonth} ${time}，${name}`);

  res.status(201).json({ message: "Task added successfully" });
});

app.delete("/tasks/:index", (req, res) => {
  const { index } = req.params;
  if (index < 0 || index >= tasks.length) {
    return res.status(400).json({ error: "Invalid task index" });
  }

  const removedTask = tasks.splice(index, 1)[0];
  const year = removedTask.date.split("-")[0];
  const dayMonth = removedTask.date.split("-").slice(1).join("/");
  console.log(
    `リストから削除: ${year}年 ${dayMonth} ${removedTask.time}，${removedTask.name}`
  );

  res.json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`アプリケーション起動`);
});


// http://localhost:3000/tasu2.html でアクセス可能

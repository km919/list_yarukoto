"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskDate = document.getElementById("task-date");
  const taskTime = document.getElementById("task-time");
  const taskList = document.getElementById("task-list");

  const fetchTasks = async () => {
    try {
      const response = await fetch("/tasks");
      const tasks = await response.json();
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const year = task.date.split("-")[0]; // 日付から年を抽出
        const dayMonth = task.date.split("-").slice(1).join("/"); // 月と日を抽出
        const formattedTask = `${year}年 ${dayMonth} ${task.time}，${task.name}`;

        const li = document.createElement("li");
        li.textContent = formattedTask;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.addEventListener("click", () => deleteTask(index));
        li.appendChild(deleteButton);

        taskList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (index) => {
    try {
      await fetch(`/tasks/${index}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;
    if (!task || !date || !time) return;

    try {
      await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: task, date, time }),
      });
      taskInput.value = "";
      taskDate.value = "";
      taskTime.value = "";
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  });

  fetchTasks();
});


// http://localhost:3000/tasu2.html でアクセス可能


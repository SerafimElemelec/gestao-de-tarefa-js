// js/app.js
import { Store } from "./store.js";
import { render } from "./ui.js";

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const search = document.getElementById("search");

document.addEventListener("DOMContentLoaded", () => {
    render();

    addBtn.addEventListener("click", addTask);
    search.addEventListener("input", render);

    document.querySelectorAll("[data-filter]").forEach(btn => {
        btn.addEventListener("click", () => {
            Store.filter = btn.dataset.filter;
            render();
        });
    });
});

/* ADD TASK */
function addTask() {
    if (!taskInput.value.trim()) return;

    Store.tasks.push({
        id: Date.now(),
        text: taskInput.value,
        done: false,
        priority: priority.value
    });

    taskInput.value = "";
    Store.save();
    render();
}

/* EXPORT GLOBAL ACTIONS */
window.toggleTask = (id) => {
    const task = Store.tasks.find(t => t.id === id);
    task.done = !task.done;
    Store.save();
    render();
};

window.deleteTask = (id) => {
    Store.tasks = Store.tasks.filter(t => t.id !== id);
    Store.save();
    render();
};
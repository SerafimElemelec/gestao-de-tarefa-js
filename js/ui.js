// js/ui.js
import { Store } from "./store.js";

export function render() {
    const list = document.getElementById("taskList");

    let tasks = Store.tasks;

    const searchValue = document.getElementById("search").value.toLowerCase();

    if (Store.filter === "done") tasks = tasks.filter(t => t.done);
    if (Store.filter === "pending") tasks = tasks.filter(t => !t.done);

    if (searchValue) {
        tasks = tasks.filter(t => t.text.toLowerCase().includes(searchValue));
    }

    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.className = `${task.priority} ${task.done ? "done" : ""}`;
        li.draggable = true;

        li.innerHTML = `
            <span onclick="toggleTask(${task.id})">
                ${task.text}
            </span>

            <div class="actions">
                <button onclick="deleteTask(${task.id})">X</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateStats();
}

/* STATS */
function updateStats() {
    const total = Store.tasks.length;
    const done = Store.tasks.filter(t => t.done).length;
    const pending = total - done;

    document.getElementById("total").textContent = total;
    document.getElementById("done").textContent = done;
    document.getElementById("pending").textContent = pending;
}
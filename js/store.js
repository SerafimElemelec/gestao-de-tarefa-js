// js/store.js
export const Store = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    filter: "all",

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
};
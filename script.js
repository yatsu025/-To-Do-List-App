document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;
    addTaskToDOM(input.value, false);
    saveTask(input.value, false);
    input.value = "";
}

function addTaskToDOM(text, completed) {
    let ul = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `<span class="${completed ? 'completed' : ''}" onclick="toggleComplete(this)">${text}</span>
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="deleteTask(this)">Delete</button>`;
    ul.appendChild(li);
}

function saveTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(button) {
    let newText = prompt("Edit your task", button.parentNode.firstChild.innerText);
    if (newText !== null) {
        button.parentNode.firstChild.innerText = newText;
        updateLocalStorage();
    }
}

function deleteTask(button) {
    button.parentNode.remove();
    updateLocalStorage();
}

function toggleComplete(span) {
    span.classList.toggle("completed");
    updateLocalStorage();
}

function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.firstChild.innerText, completed: li.firstChild.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

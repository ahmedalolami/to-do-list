const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// تحميل المهام من localStorage عند فتح الصفحة
window.onload = loadTasks;

addTaskBtn.addEventListener("click", addTask);//لما المستخدم يضغط علي زر الاضافة ينادي علي func addTask()
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();    
});// خاصية الانتر 

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    // زر التعديل
    const editBtn = document.createElement("button");
    editBtn.textContent = "تعديل";
    editBtn.classList.add("edit-btn");
    li.appendChild(editBtn);

    // زر الحذف
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

// أحداث الحذف والتعديل والتعليم كمكتملة
taskList.addEventListener("click", (e) => {
    const li = e.target.parentElement;

    if (e.target.classList.contains("delete-btn")) {
        li.remove();
        saveTasks();
    } else if (e.target.classList.contains("edit-btn")) {
        const currentText = li.firstChild.textContent;
        const newText = prompt("عدل المهمة:", currentText);
        if (newText !== null && newText.trim() !== "") {
            li.firstChild.textContent = newText.trim();
            saveTasks();
        }
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
        saveTasks();
    }
});

// حفظ المهام في localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// تحميل المهام من localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        const editBtn = document.createElement("button");
        editBtn.textContent = "تعديل";
        editBtn.classList.add("edit-btn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "حذف";
        deleteBtn.classList.add("delete-btn");
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}
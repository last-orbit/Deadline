const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskItem = document.getElementById("taskItem");

/*
    Functions
*/

// Date Section

// function openDate(){}

// function submitDate(){}

// function getDate(){}

// function removeDate(){}

// function deleteDate(){}

// Task Section
function openBox() {
  taskForm.style.display = "flex";
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const taskName = document.getElementById("taskName").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;

  const task = {
    taskName,
    status,
    priority,
  };

  setData(task);
  taskForm.reset();
  taskForm.style.display = "none";
  listTask();
}

function listTask() {
  taskList.innerHTML = ``;
  const data = getData();
  if (data) {
    taskList.innerHTML += `<ol>`;
    data.forEach((task, index) => {
        let color;
      switch (task.priority) {
        case "1":
          color = "red";
          break;
        case "2":
          color = "blue";
          break;
      }
      taskList.innerHTML += `<li style="background-color:${color}">${task.taskName} <span><strong>status</strong>:${task.status}</span><span> priority :${task.priority}</span><div>
      <input type="checkbox" id="checkbox" name="complete" />
      <label for="checkbox" onclick="completeTask()">Complete</label>
    </div></li>`;
    });
    taskList.innerHTML += `</ol>`;
  }
}

function getData() {
  const data = localStorage.getItem("tasks");

  return data ? JSON.parse(data) : [];
}

function setData(task) {
  const tasks = getData();

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function completeTask(event) {
  getData();
}

// function deleteTask(){}

/*
    Event Listeners
*/
window.addEventListener("DOMContentLoaded", () => {
  listTask();
});
taskForm.addEventListener("submit", handleTaskSubmit);

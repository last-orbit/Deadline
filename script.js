const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskItem = document.getElementById("taskItem");
const completeTaskList = document.getElementById("completeTaskList");

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
    complete: false,
  };

  setData(task);
  taskForm.reset();
  taskForm.style.display = "none";
  listTask();
}

function listTask() {
  taskList.innerHTML = ``;
  const data = getData("tasks");
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
        case "3":
          color = "green";
          break;
        case "4":
          color = "gray";
      }
      taskList.innerHTML += `<div style="background-color:${color}">
                              <p>${task.taskName}</p>
<p> Status: <select data-index="${index}"> <option ${task.status === "Not Started" ? "selected" : ""}>Not Started</option> <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option> <option ${task.status === "Complete" ? "selected" : ""}>Complete</option> </select> </p> <p>Priority: ${task.priority}</p>
                                <div>
                                  <input type="checkbox" id="checkbox-${index}" name="complete" data-index=${index} />
                                  <label for="checkbox-${index}">Complete</label>
                                </div>
                                <button data-index="${index}" data-list="tasks">Delete</button>
                            </div>`;
    });
    taskList.innerHTML += `</ol>`;
  }
}
function changeStatus() {
  listTask();
}

function listCompletedTasks() {
  completeTaskList.innerHTML = ``;
  const data = getData("completedTasks");
  if (data) {
    completeTaskList.innerHTML += `<ol>`;
    data.forEach((task, index) => {
      completeTaskList.innerHTML += `<div id="completedTask>
                              <p>${task.taskName}</p>
                              <p>status</p>:${task.status} <p>priority :${task.priority}</p>
                              <button data-index="${index}" data-list="completedTasks">Delete</button>
                            </div>`;
    });
    completeTaskList.innerHTML += `</ol>`;
  }
}

function getData(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

function setData(task) {
  const tasks = getData("tasks");
  tasks.unshift(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function completeTask(event) {
  if (event.target.matches("input[type='checkbox'] ")) {
    const index = event.target.dataset.index;
    const tasks = getData("tasks");
    const completedTasks = getData("completedTasks");
    tasks[index].complete = event.target.checked;
    completedTasks.unshift(tasks[index]);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    listTask();
    listCompletedTasks();
  }
}

function deleteTask(event) {
  const index = event.target.dataset.index;
  const list = event.target.dataset.list;
  const tasks = getData("tasks");
  const completedTasks = getData("completedTasks");

  if (list === "tasks") {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    listTask();
  }

  if (list === "completedTasks") {
    completedTasks.splice(index, 1);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    listCompletedTasks();
  }
}

/*
    Event Listeners
*/
window.addEventListener("DOMContentLoaded", () => {
  listTask();
  listCompletedTasks();
});
taskForm.addEventListener("submit", handleTaskSubmit);
taskList.addEventListener("change", changeStatus);
taskList.addEventListener("click", completeTask);
taskList.addEventListener("click", deleteTask);
completeTaskList.addEventListener("click", deleteTask);

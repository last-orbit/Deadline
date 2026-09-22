const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskItem = document.getElementById("taskItem");
let completeTaskList = document.getElementById("completeTaskList");

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
      taskList.innerHTML += `<div>
                              <p style="background-color:${color}">${task.taskName}</p>
                              <p>status</p>:${task.status} <p>priority :${task.priority}</p>
                                <div>
                                  <input type="checkbox" id="checkbox-${index}" name="complete" data-index=${index} />
                                  <label for="checkbox-${index}">Complete</label>
                                </div>
                            </div>`;
    });
    taskList.innerHTML += `</ol>`;
  }
}

function listCompletedTasks() {
  completeTaskList.innerHTML = ``;
  const data = getData('completedTasks');
  if (data) {
    completeTaskList.innerHTML += `<ol>`;
    data.forEach((task, index) => {
      completeTaskList.innerHTML += `<div>
                              <p>${task.taskName}</p>
                              <p>status</p>:${task.status} <p>priority :${task.priority}</p>
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
    listTask()
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    listCompletedTasks();
  }
}

// function deleteTask(){}

/*
    Event Listeners
*/
window.addEventListener("DOMContentLoaded", () => {
  listTask();
  listCompletedTasks();
});
taskForm.addEventListener("submit", handleTaskSubmit);
taskList.addEventListener("click", completeTask);

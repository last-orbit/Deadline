// Date Imports
const dateForm = document.getElementById("dateForm");
const dateInfo = document.getElementById("dateInfo");
const dateSubmit = document.getElementById("dateSubmit");
const deadlineDropdown = document.getElementById("deadlineDropdown");
const time = document.getElementById("time").value;

// Task Imports
const taskForm = document.getElementById("taskForm");
const taskClose= document.getElementById("taskClose")
const taskList = document.getElementById("taskList");
const taskItem = document.getElementById("taskItem");
const completeTaskList = document.getElementById("completeTaskList");

/*
    Functions
*/

// Date Section

function deadlineBox() {
  dateForm.style.display = "flex";
}

function handleDateSubmit(event) {
  event.preventDefault();
  const deadlineName = document.getElementById("deadlineName").value;
  const deadline = document.getElementById("deadline").value;

  const date = {
    id: crypto.randomUUID(),
    deadlineName,
    deadline,
    time,
  };
  // console.log(date)

  setDateData(date);
  dateForm.reset();
  dateForm.style.display = "none";
  // dateSubmit.style.display = "none";
  listDateInfo();
}

function listDateInfo() {
  dateInfo.innerHTML = "";
  deadlineDropdown.innerHTML = "";

  const data = getDateData("dates");
  console.log("dates:", data);
  console.log("number of dates:", data.length);
  if (data.length > 0) {
    const date = data[0];
    console.log(date);
    dateInfo.innerHTML += `<div>
    <h2 id="displayName">${date.deadlineName}</h2>
    <div>
    <button>Delete</button>
    </div>
    </div>`;
    // <h2>${date.deadline}</h2> added after the h2 of deadlineName
    // <button>Add Time</button> added before the delete button

    data.forEach((date) => {
      deadlineDropdown.innerHTML += `<option value=${date.id}>
      ${date.deadlineName}
      </option>`;
    });
  }
}

function countdown() {
  const data = getDateData("dates");

  if (data.length > 0) {
    const selectedId = deadlineDropdown.value;
    const date = data.find((date) => date.id === selectedId);
    const targetDate = new Date(`${date.deadline}T${date.time}`).getTime();
    const currentDate = new Date().getTime();
    const distance = targetDate - currentDate;

    // console.log("Deadline:", date.deadline);
    // console.log("Target:", new Date(targetDate));
    // console.log("Current:", new Date(currentDate));

    const days = Math.floor(distance / 1000 / 60 / 60 / 24);
    const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(distance / 1000 / 60) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    document.getElementById("displayName").textContent = date.deadlineName;
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    // console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
  }
}

setInterval(countdown, 1000);

function getDateData(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

function setDateData(date) {
  const dates = getDateData("dates");
  dates.unshift(date);
  localStorage.setItem("dates", JSON.stringify(dates));
}

// function addTime(event) {}

function deleteDate(event) {
  const index = event.target.dataset.index;
  const dates = getDateData("dates");

  dates.splice(index, 1);
  localStorage.setItem("dates", JSON.stringify(dates));
  listDateInfo();
}

// Task Section
function taskBox() {
  taskForm.style.display = "flex";
  const data = getDateData("dates");
  if(data.length === 0) {
    taskForm.style.display = "none"
    alert("You have to create a Deadline first")
  }
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const taskName = document.getElementById("taskName").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;

  const task = {
    deadlineId: deadlineDropdown.value,
    taskName,
    status,
    priority,
    complete: false,
  };

  setTaskData(task);
  taskForm.reset();
  taskForm.style.display = "none";
  listTask();
}

function listTask() {
  taskList.innerHTML = ``;
  const data = getTaskData("tasks");
  const tasksForDeadline = data.filter((task) => {
    return task.deadlineId === deadlineDropdown.value;
});
  if (data) {
    taskList.innerHTML += `<ol>`;
    tasksForDeadline.forEach((task, index) => {
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
          <p> Status: <select data-index="${index}"> 
            <option ${task.status === "Not Started" ? "selected" : ""}>Not Started</option> 
            <option ${task.status === "Waiting" ? "selected" : ""}>Waiting</option>
            <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option> 
            <option ${task.status === "Complete" ? "selected" : ""}>Complete</option> </select> 
          </p> 
          <p>Priority: ${task.priority}</p>
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
function changeStatus(event) {
  const tasks = getTaskData("tasks");
  const index = event.target.dataset.index;
  const status = event.target.value;
  tasks[index].status = status;

  if (tasks[index].status === "Complete") {
    const completedTasks = getTaskData("completedTasks");

    completedTasks.unshift(tasks[index]);
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    listTask();
    listCompletedTasks();
  } else {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    listTask();
  }
}

function listCompletedTasks() {
  completeTaskList.innerHTML = ``;
  const data = getTaskData("completedTasks");
  console.log(data);
  if (data) {
    completeTaskList.innerHTML += `<ol>`;
    data.forEach((task, index) => {
      completeTaskList.innerHTML += `<div id="completedTask">
          <p>${task.taskName}</p>
          <p>status</p>:${task.status} <p>priority :${task.priority}</p>
          <button data-index="${index}" data-list="completedTasks">Delete</button>
        </div>`;
    });
    completeTaskList.innerHTML += `</ol>`;
  }
}

function getTaskData(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

function setTaskData(task) {
  const tasks = getTaskData("tasks");
  tasks.unshift(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function completeTask(event) {
  if (event.target.matches("input[type='checkbox'] ")) {
    const index = event.target.dataset.index;
    const tasks = getTaskData("tasks");
    const completedTasks = getTaskData("completedTasks");
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
  const tasks = getTaskData("tasks");
  const completedTasks = getTaskData("completedTasks");

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
  listDateInfo();
  listTask();
  listCompletedTasks();
});
/*
  Date Event Listeners
*/
dateForm.addEventListener("submit", handleDateSubmit);
dateClose.addEventListener("click", () => {
  dateForm.style.display = "none"
  dateForm.reset();
})
deadlineDropdown.addEventListener("change", () => {
  countdown();
  listTask();
});
dateInfo.addEventListener("click", deleteDate);
// dateInfo.addEventListener("click", addTime);

/*
  Task Event Listeners
*/
taskForm.addEventListener("submit", handleTaskSubmit);
taskClose.addEventListener("click", () => {
  taskForm.style.display = "none";
  taskForm.reset();
})
taskList.addEventListener("change", changeStatus);
taskList.addEventListener("click", completeTask);
taskList.addEventListener("click", deleteTask);
completeTaskList.addEventListener("click", deleteTask);

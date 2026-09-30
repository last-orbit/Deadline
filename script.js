// Date Imports
const dateForm = document.getElementById("dateForm");
const dateInfo = document.getElementById("dateInfo");
const dateSubmit = document.getElementById("dateSubmit");
const deadlineDropdown = document.getElementById("deadlineDropdown");
const dateClose = document.getElementById("dateClose");

// Task Imports
const taskForm = document.getElementById("taskForm");
const taskClose = document.getElementById("taskClose");
const taskList = document.getElementById("taskList");
const taskItem = document.getElementById("taskItem");
const completeTaskList = document.getElementById("completeTaskList");

/*
    Get Today's Date
*/

const deadlineInput = document.getElementById("deadline");

const today = new Date().toISOString().split("T")[0];

deadlineInput.min = today;

/*
    Functions
*/

// Notifications
function showNotification(message) {
  const notification = document.createElement("div");

  notification.classList.add("notification");
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

/*
    Date Section
*/

function deadlineBox() {
  dateForm.style.display = "flex";
}

//Create Deadline
function handleDateSubmit(event) {
  event.preventDefault();
  const deadlineName = document.getElementById("deadlineName").value;
  const deadline = document.getElementById("deadline").value;
  const time = document.getElementById("time").value;

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
  showNotification("Deadline Created!");
}

// Show Date
function listDateInfo() {
  const selectedId = deadlineDropdown.value;

  dateInfo.innerHTML = "";
  deadlineDropdown.innerHTML = "";

  const data = getDateData("dates");
  // console.log("dates:", data);
  // console.log("number of dates:", data.length);
  if (data.length > 0) {
    data.forEach((date) => {
      deadlineDropdown.innerHTML += `<option value=${date.id}>
      ${date.deadlineName}
      </option>`;
    });
    if (data.some((date) => date.id === selectedId)) {
      deadlineDropdown.value === selectedId;
    }
    const selectedDate = data.find(
      (date) => date.id === deadlineDropdown.value,
    );
    if (!selectedDate) return;

    // console.log(selectedDate);
    dateInfo.innerHTML += `<div>
    <h2 id="displayName">${selectedDate.deadlineName}</h2>
    <div>
    <button data-id="${selectedDate.id}">Delete</button>
    </div>
    </div>`;
    // <h2>${date.deadline}</h2> added after the h2 of deadlineName
    // <button>Add Time</button> added before the delete button
  }
}

function countdown() {
  const data = getDateData("dates");

  if (data.length === 0) {

  document.getElementById("displayName").textContent = "";
  document.getElementById("days").textContent = "00";
  document.getElementById("hours").textContent = "00";
  document.getElementById("minutes").textContent = "00";
  document.getElementById("seconds").textContent = "00";

    return;
  }
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

setInterval(countdown, 1000);

//Date CRUD
function getDateData(key) {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
}

function setDateData(date) {
  const dates = getDateData("dates");
  dates.unshift(date);
  localStorage.setItem("dates", JSON.stringify(dates));
}

// function addTime(event) {} for the future

function deleteDate(event) {
  const id = event.target.dataset.id;
  const dates = getDateData("dates");

  const updatedDates = dates.filter((date) => date.id !== id);
  localStorage.setItem("dates", JSON.stringify(updatedDates));
  countdown(); // switched countdown to be on top, so that the reset actually happens instead the old countdown appearing
  listDateInfo();
  listTask();
  showNotification("Deadline Deleted");
}

/*
   Task Section
*/

function taskBox() {
  taskForm.style.display = "flex";
  const data = getDateData("dates");
  if (data.length === 0) {
    taskForm.style.display = "none";
    alert("You have to create a Deadline first");
  }
}

//Create Task
function handleTaskSubmit(event) {
  event.preventDefault();

  const taskName = document.getElementById("taskName").value;
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;

  const task = {
    id: crypto.randomUUID(),
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
  showNotification("Task Created!");
}

//Show Task
function listTask() {
  taskList.innerHTML = ``;
  const data = getTaskData("tasks");
  const tasksForDeadline = data.filter((task) => {
    return task.deadlineId === deadlineDropdown.value;
  });
  if (data.length > 0) {
    taskList.innerHTML += `<ol>`;
    tasksForDeadline.forEach((task) => {
      let color;
      switch (task.priority) {
        case "1":
          color = "#fb9595";
          break;
        case "2":
          color = "#d9d9d9";
          break;
        case "3":
          color = "#d9ead3";
          break;
        case "4":
          color = "#e2dfe8";
      }
      taskList.innerHTML += `<div class="task-item" style="background-color:${color}">
          <p class="task-name">${task.taskName}</p>
          <p class="task-status"> Status: <select data-id="${task.id}"> 
            <option ${task.status === "Not Started" ? "selected" : ""}>Not Started</option> 
            <option ${task.status === "Waiting" ? "selected" : ""}>Waiting</option>
            <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option> 
            <option ${task.status === "Complete" ? "selected" : ""}>Complete</option> </select> 
          </p> 
          <p class="task-priority">Priority: ${task.priority}</p>
            <div class="task-complete">
              <input type="checkbox" id="checkbox-${task.id}" name="complete" data-id=${task.id} />
              <label for="checkbox-${task.id}">Complete</label>
            </div>
            <button data-id="${task.id}" data-list="tasks">Delete</button>
        </div>`;
    });
    taskList.innerHTML += `</ol>`;
  }
}

//Change Status
function changeStatus(event) {
  const tasks = getTaskData("tasks");

  const id = event.target.dataset.id;
  const status = event.target.value;

  const task = tasks.find((task) => task.id === id);

  if (!task) return;

  task.status = status;

  // If Status changes to Complete
  if (task.status === "Complete") {
    const completedTasks = getTaskData("completedTasks");

    completedTasks.unshift(task);
    // tasks.splice(index, 1);

    const updatedTasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    listTask();
    listCompletedTasks();

    showNotification("Task Completed");
    console.log(showNotification);
  } else {
    // Task changes to something other than Complete
    localStorage.setItem("tasks", JSON.stringify(tasks));

    listTask();
  }
}

//Show Completed Tasks
function listCompletedTasks() {
  completeTaskList.innerHTML = ``;
  const data = getTaskData("completedTasks");
  console.log(data);
  if (data.length > 0) {
    completeTaskList.innerHTML += `<ol>`;
    data.forEach((task) => {
      completeTaskList.innerHTML += `
      <div class="task-item" id="completedTask">
          <p class="task-name">${task.taskName}</p>
          <button data-id="${task.id}" data-list="completedTasks">Delete</button>
          </div>`;
    });
    completeTaskList.innerHTML += `</ol>`;
  }
}
// <p>Status:${task.status}</p> <p>Priority :${task.priority}</p>

// Task CRUD
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
    const id = event.target.dataset.id;
    const tasks = getTaskData("tasks");
    const completedTasks = getTaskData("completedTasks");
    const task = tasks.find((task) => task.id === id);
    if (!task) return;
    task.complete = event.target.checked;
    completedTasks.unshift(task);
    const updatedTasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    listTask();
    listCompletedTasks();
    showNotification("Task Completed");
  }
}

function deleteTask(event) {
  const id = event.target.dataset.id;
  const list = event.target.dataset.list;
  const tasks = getTaskData("tasks");
  const completedTasks = getTaskData("completedTasks");

  if (list === "tasks") {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    listTask();
    showNotification("Task Deleted");
  }

  if (list === "completedTasks") {
    const updatedCompletedTasks = completedTasks.filter(
      (task) => task.id !== id,
    );

    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks),
    );

    listCompletedTasks();
    showNotification("Task Deleted");
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
  dateForm.style.display = "none";
  dateForm.reset();
});
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
});
taskList.addEventListener("change", changeStatus);
taskList.addEventListener("click", completeTask);
taskList.addEventListener("click", deleteTask);
completeTaskList.addEventListener("click", deleteTask);

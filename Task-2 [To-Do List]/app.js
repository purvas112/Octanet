//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all Event Listners
loadEventListners();

//Load All event listners
function loadEventListners() {
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  //Add task event
  form.addEventListener("submit", addTask);

  //Remove Task event
  taskList.addEventListener("click", removeTask);

  //Clear Task event
  clearBtn.addEventListener("click", clearTask);
}

//Get tasks form LocalStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //Creat li elements
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item";
    //Create text node and apppent to the li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //Add class
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append the li to ul
    taskList.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }

  //Creat li elements
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item";
  //Create text node and apppent to the li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //Add class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append the li to ul
  taskList.appendChild(li);

  //Store in localStorage
  storeTaskInLocalstorage(taskInput.value);

  //clear the input
  taskInput.value = "";

  e.preventDefault();
}

//Store Task in localstorage
function storeTaskInLocalstorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure")) {
      e.target.parentElement.parentElement.remove();

      //Remove from localStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Task
function clearTask() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear tasks form localStorage
  clearTasksFromLocalStorage();
}

//Clear Tasks from ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

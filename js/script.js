const dom = {
  new: document.getElementById("new"),
  add: document.getElementById("add"),
  tasks: document.getElementById("tasks"),
};
//Массив задач
const tasks = [];

dom.add.onclick = () => {
  const newTaskText = dom.new.value;
  if (newTaskText && !checkTask(newTaskText, tasks)) {
    addTask(newTaskText, tasks);
    dom.new.value = "";
    tasksRender(tasks);
  }
};

//Функция добавления задач
function addTask(text, list) {
  const timestap = Date.now();
  const task = {
    id: timestap,
    text,
    isComplete: false,
    // isImportant: false,
  };
  list.push(task);
}

//Проверка существования задачи в массиве задач
function checkTask(text, list) {
  let isHave = false;

  if (!list.length) {
    return false;
  }

  list.forEach((task) => {
    if (task.text == text) {
      alert("Задача уже существует!");
      isHave = true;
    }
  });
  return isHave;
}

//Функция вывода списка задач
function tasksRender(list) {
  let htmlList = "";

  list.forEach((task) => {
    const cls = task.isComplete ? "todo-task todo-task-complete" : "todo-task";
    const checked = task.isComplete ? "checked" : "";
    // const isImportant = task.isImportant ? "checked" : "";
    const taskHtml = `
        <div id="${task.id}" class="${cls}">
        <label class="todo-checkbox">
          <input type="checkbox" ${checked} />
          <div class="todo-checkbox-div"></div>
        </label>
        <div class="todo-task-title">${task.text}</div>
        <div class="todo-task-del">-</div>
        
      </div>`;

    htmlList = htmlList + taskHtml;
  });
  dom.tasks.innerHTML = htmlList;
}

//Отслеживаем клик по чекбоксу с задачей
dom.tasks.onclick = (event) => {
  const target = event.target;
  if (target.classList.contains("todo-checkbox-div")) {
    const task = target.parentElement.parentElement;
    const taskId = task.getAttribute("id");
    changeTaskStatus(taskId, tasks);
    tasksRender(tasks);
  }
  if (target.classList.contains("todo-task-del")) {
    const task = target.parentElement;
    const taskId = task.getAttribute("id");
    deleteTask(taskId, tasks);
    tasksRender(tasks);
  }
};

//Функция изменения статуса задачи
function changeTaskStatus(id, list) {
  list.forEach((task) => {
    if (task.id == id) {
      task.isComplete = !task.isComplete;
    }
  });
}

//Функция удаления задачи
function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if (task.id == id) {
      list.splice(idx, 1);
    }
  });
}

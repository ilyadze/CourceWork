const dom = {
  new: document.getElementById("new"),
  add: document.getElementById("add"),
  tasks: document.getElementById("tasks"),
};
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
    const taskHtml = `
        <div id="${task.id}" class="${cls}">
        <label class="todo-checkbox">
          <input type="checkbox" checked="${task.isComplete}" />
          <div></div>
        </label>
        <div class="todo-task-title">${task.text}</div>
        <div class="todo-task-del">-</div>
      </div>`;

    htmlList = htmlList + taskHtml;
  });
  dom.tasks.innerHTML = htmlList;
}

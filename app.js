const addTaskBtn = document.querySelector('.add-task-btn');
const tasksList = document.querySelector('.tasks-list');

let tasks = [];

function expandTaskInput(e) {
  addTaskBtn.setAttribute('contenteditable', true);
  addTaskBtn.focus();
}

function renderTaskList() {
  tasksList.innerHTML = tasks.map(task => {
    return `
      <li>
        ${task.value}
      </li>  
    `
  }).join('')
}

function addTask(task) {
  tasks.push(task);
  renderTaskList(tasks, tasksList);
}

function stopEditing() {
  const text = this.textContent;
  addTaskBtn.removeAttribute('contenteditable');
  if (!text) return;
  const newTask = {
    value: text,
    id: (new Date()).getTime(),
    done: false
  };
  addTask(newTask);
  this.textContent = '';
}

addTaskBtn.addEventListener('click', expandTaskInput);
addTaskBtn.addEventListener('blur', stopEditing);
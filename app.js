const addTaskBtn = document.querySelector('.add-task-btn');
const tasksList = document.querySelector('.tasks-list');

let tasks = [];

function expandTaskInput() {
  addTaskBtn.setAttribute('contenteditable', true);
  addTaskBtn.focus();
}

function listenKeys(e) {
  if (!addTaskBtn.hasAttribute('contenteditable')) return;
  if (e.code === 'Escape') cancelEditing();
  if (e.code === 'Enter') finishEditing();
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

function cancelEditing() {
  addTaskBtn.textContent = '';
  addTaskBtn.removeAttribute('contenteditable');
}

function finishEditing() {
  const text = this.textContent;
  this.textContent = '';
  addTaskBtn.removeAttribute('contenteditable');
  if (!text) return;
  const newTask = {
    value: text,
    id: (new Date()).getTime(),
    done: false
  };
  addTask(newTask);
}

addTaskBtn.addEventListener('click', expandTaskInput);
addTaskBtn.addEventListener('blur', finishEditing);
document.addEventListener('keydown', listenKeys);
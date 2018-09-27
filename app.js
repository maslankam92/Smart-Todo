const addTaskBtn = document.querySelector('.add-task-btn');
const tasksList = document.querySelector('.tasks-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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
      <li data-id="${task.id}">
        <input type="checkbox" class="cbx" ${task.done ? 'checked' : ''}/>
        <label data-id="${task.id}" for="cbx">${task.value}</label>
      </li>  
    `
  }).join('')
}

function addTask(task) {
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
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

function toggleDone(e) {
  if (!e.target.matches('input')) {
    const newTasks = tasks.map(task => {
      if (task.id === +e.target.dataset.id) {
        task.done = !task.done;
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList(newTasks, tasksList);
  }
}

renderTaskList(tasks, tasksList);

addTaskBtn.addEventListener('click', expandTaskInput);
addTaskBtn.addEventListener('blur', finishEditing);
document.addEventListener('keydown', listenKeys);
tasksList.addEventListener('click', toggleDone);
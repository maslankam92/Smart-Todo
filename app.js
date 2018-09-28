const addTaskBtn = document.querySelector('.add-task-btn');
const tasksList = document.querySelector('.tasks-list');

/* Speech Recognition */
const recognition = new webkitSpeechRecognition();
recognition.lang = 'pl-PL';
recognition.interimResults = true;

function writeTask(e) {
  addTaskBtn.textContent = e.results[0][0].transcript;
}

function recognitionError(e) {
  console.error('Something went wrong: ' + e.error);
}

/* to do app functionalities */

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function expandTaskInput() {
  if (addTaskBtn.hasAttribute('contenteditable')) return;
  addTaskBtn.setAttribute('contenteditable', true);
  addTaskBtn.focus();
  recognition.start();
}

function listenKeys(e) {
  if (!addTaskBtn.hasAttribute('contenteditable')) return;
  if (e.code === 'Escape') cancelEditing();
  if (e.code === 'Enter') finishEditing();
}

function renderTaskList(newTasks, tasksList) {
  tasksList.innerHTML = newTasks.map(task => {
    return `
      <li data-id="${task.id}">
        <input type="checkbox" class="cbx" ${task.done ? 'checked' : ''}/>
        <label data-id="${task.id}" for="cbx">${task.value}</label>
        <i class="fas fa-trash"></i>
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
  let newTasks;
  if (e.target.matches('.fa-trash')) {
    e.stopPropagation();
    newTasks = [...tasks].filter(task => {
      return task.id !== +e.target.parentNode.dataset.id;
    });
    tasks = newTasks;
  }

  if (e.target.matches('label') || e.target.matches('li')) {
    console.log('asdasdsd');
    newTasks = [...tasks].map(task => {
      if (task.id === +e.target.dataset.id) {
        task.done = !task.done;
      }
      return task;
    });
  }
  localStorage.setItem('tasks', JSON.stringify(newTasks));
  renderTaskList(newTasks, tasksList);
}

renderTaskList(tasks, tasksList);

addTaskBtn.addEventListener('click', expandTaskInput);
addTaskBtn.addEventListener('blur', finishEditing);
document.addEventListener('keydown', listenKeys);
tasksList.addEventListener('click', toggleDone);
recognition.addEventListener('result', writeTask);
recognition.addEventListener('end', finishEditing);
recognition.addEventListener('error', recognitionError);
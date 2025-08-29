const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filter = document.getElementById('filter');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
taskList.addEventListener('click', handleTaskClick);
filter.addEventListener('change', applyFilter);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text"></span>
    <div>
      <button class="check-btn" title="Mark completed">✅</button>
      <button class="delete-btn" title="Delete">🗑️</button>
    </div>
  `;
  li.querySelector('.task-text').textContent = text; // safe text insert
  taskList.appendChild(li);
  taskInput.value = '';
  applyFilter(); // respect current filter after adding
}

function handleTaskClick(e) {
  if (e.target.classList.contains('check-btn')) {
    e.target.closest('li').classList.toggle('completed');
    applyFilter(); // re-apply filter after toggling
  } else if (e.target.classList.contains('delete-btn')) {
    e.target.closest('li').remove();
  }
}

function applyFilter() {
  const tasks = taskList.querySelectorAll('li');
  tasks.forEach(task => {
    if (filter.value === 'all') {
      task.style.display = ''; // let CSS control layout
    } else if (filter.value === 'completed') {
      task.style.display = task.classList.contains('completed') ? '' : 'none';
    } else if (filter.value === 'uncompleted') {
      task.style.display = task.classList.contains('completed') ? 'none' : '';
    }
  });
}

 const taskList = document.getElementById('taskList');
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');

  const listTasksUrl = '/to-do/tasks/';         // Replace with your actual endpoint
  const createTaskUrl = '/to-do/add-task/'; // Replace with your actual endpoint

  // Fetch and render tasks
  async function loadTasks() {
    const res = await fetch(listTasksUrl);
    const tasks = await res.json();
    renderTasks(tasks);
  }

  // Render tasks
  function renderTasks(tasks) {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      taskList.innerHTML = '<li class="list-group-item text-center text-muted">No tasks yet.</li>';
    } else {
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center task-item';
        li.innerHTML = `
          <span>${task.text}</span>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
      });
    }
  }

  // Create task
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    await fetch(createTaskUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken()
      },
      body: JSON.stringify({ text: text })
    });

    taskInput.value = '';
    loadTasks();
  });

  // Optionally: delete task function
  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}/delete/`, {
      method: 'DELETE',
      headers: { 'X-CSRFToken': getCSRFToken() }
    });
    loadTasks();
  }

  // CSRF token helper (if using Django’s CSRF protection)
  function getCSRFToken() {
    const name = 'csrftoken';
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name + '='));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : '';
  }

  // Initial load
  loadTasks();
let tasks = [];

const addTask = () => {
    const taskInput = document.querySelector('.task-input');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        const newTask = {
            id: Date.now(),
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
    }

    renderTasks();
    taskInput.value = '';
}

const taskInput = document.querySelector('.task-input');
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function markCompleted(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    updateCompletedTask(id);
}

function updateCompletedTask(id) {
    const taskElement = document.getElementById(id);
    if (taskElement) {
        const task = tasks.find(task => task.id === id);
        taskElement.classList.toggle('completed', task.completed);
    }
}

const renderTasks = () => {
    const taskList = document.querySelector('.todo-app__list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.setAttribute('id', task.id);
        taskElement.classList.add('task');

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('container');

        const taskCircle = document.createElement('div');
        taskCircle.classList.add('circle');

        const taskName = document.createElement('span');
        taskName.textContent = task.name;

        const taskDelete = document.createElement('i');
        taskDelete.classList.add('bx', 'bx-x', 'close-icon');
        taskDelete.addEventListener('click', () => deleteTask(task.id));

        taskContainer.appendChild(taskCircle);
        taskContainer.appendChild(taskName);

        taskElement.appendChild(taskContainer);
        taskElement.appendChild(taskDelete);

        taskList.appendChild(taskElement);

        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onclick="markCompleted(${task.id})">
            <span class="task-name ${task.completed ? 'completed' : ''}">${task.name}</span>
            <button class="delete-task" onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(taskElement);
    });
}

// Initial render
renderTasks();

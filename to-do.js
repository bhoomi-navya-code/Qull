document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskbtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-todo');
    const todocontainer = document.querySelector('.todo-container');
    const pragressBar = document.getElementById('progress');
    const pragressNumbers = document.getElementById('number');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todocontainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    const updateProgress = (checkCompletion = true) => {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

        pragressBar.style.width = totalTasks
            ? `${(completedTasks / totalTasks) * 100}%`
            : '0%';

        pragressNumbers.textContent = `${completedTasks}/${totalTasks}`;

        if (checkCompletion && totalTasks > 0 && completedTasks === totalTasks) {
            confetti();
        }
    };


    const saveTaskToLocalStorage = () => {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
        text: li.querySelector('span').textContent,
        completed: li.querySelector('.checkbox').checked
       }));

       localStorage.setItem('tasks', JSON.stringify(tasks));
    };



    const loadTaskFromLocalStorang = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
        toggleEmptyState();
        updateProgress();
    }


    const addTask = (text, completed = false, checkCompletion = true) => {
        const taskText = text || taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}/>
            <span>${taskText}</span>
            <div class="take-bte-todo">
                <button class="edit-todo-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-to-btn"><i class="fa-solid fa-xmark"></i></button>
            </div>`;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-todo-btn');

        if (completed) {
            li.classList.add('completed');
            editBtn.disabled = true;
            editBtn.style.opacity = '0.5';
            editBtn.style.pointerEvents = 'none';
        }

        checkbox.addEventListener('change', () => {
            const isChecked = checkbox.checked;
            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';

            updateProgress();
            saveTaskToLocalStorage();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
                updateProgress(false);
                saveTaskToLocalStorage();
            }
        });

        li.querySelector('.delete-to-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
            updateProgress();
            saveTaskToLocalStorage();
        });

        taskList.appendChild(li);
        taskInput.value = '';

        toggleEmptyState();
        saveTaskToLocalStorage();

        if (checkCompletion) {
            updateProgress();
        }
    };

    const todoForm = document.querySelector('.input-area');

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });

    addTaskbtn.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    loadTaskFromLocalStorang();

    toggleEmptyState();
    updateProgress();
});


const confetti = () => {
   const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: .94,
  startVelocity: 30
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 30,
    scalar: 1.2,
    shapes: ["circle", "square"],
    colors: [
      "#a864fd",
      "#29cdff",
      "#78ff44",
      "#ff718d",
      "#fdff6a"
    ]
  });
  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: { emoji: { value: ["🦄", "🌈"] } }
  });
}
setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}
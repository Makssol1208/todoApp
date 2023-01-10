const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask) ;

//Функции
function addTask (event) {
  //Отменяем отправку формы
  event.preventDefault();

  //Достаём текст задачи из поля ввода
  const taskText = taskInput.value;

  //Описываем задачу в виде объекта
  const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
  };

  //Формируем css класс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  //Добавляем задачу в массив с задачами
  tasks.push(newTask)

  //Формируем разметку для новой задачи
  const taskHTML = `
            <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
              <span class="${cssClass}">${newTask.text}</span>
              <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                  <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                  <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
              </div>
            </li>`;

  //Добавляем задачу на страницу
  tasksList.insertAdjacentHTML('beforeend', taskHTML);

  //Очищаем поле ввода и оставляем курсор в input.
  taskInput.value = ''
  taskInput.focus()

  if(tasksList.children.length > 1) {
    emptyList.classList.add('none');
  }
}

function deleteTask(event) {
  if(event.target.dataset.action !== 'delete') return;

    const parenNode = event.target.closest('.list-group-item');

    const id = Number(parenNode.id);

    //Находим индекс задачи в массиве
    const index = tasks.findIndex((task) => task.id === id);

    //Удаляем задачу из массива с задачами
    tasks.splice(index, 1);

    //Удаляем задачу из разметки
    parenNode.remove();
      
    if(tasksList.children.length === 1) {
      emptyList.classList.remove('none');
  }
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return
      const parentNode = event.target.closest('.list-group-item');
      const taskTitle = parentNode.querySelector('.task-title');
      taskTitle.classList.toggle('task-title--done');
}

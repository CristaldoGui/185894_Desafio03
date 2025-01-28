const inputTaskName = document.getElementById('input-task-name');
const inputTaskTag = document.getElementById('input-task-tag');
const taskContainer= document.getElementById('tasks-container');
const buttonCreateTask = document.getElementById('button-inputs')

let tasksDone = 0;

buttonCreateTask.addEventListener('click', createTask);

const initialTasks = [
    { title: "Estudar JavaScript", tag: "Estudo", date: getDate() },
    { title: "Treinar na academia", tag: "Saúde", date: getDate() }
];

function loadInitialTasks() {
    initialTasks.forEach(task => {
        createDivTask(task.title, task.tag, task.date, task.done);
        if (task.done) {
            markTaskDone(document.querySelectorAll('.card-task').length - 1);
        }
    });
}

window.onload = loadInitialTasks;

function createTask () {
    const nameTask = inputTaskName.value;
    const tagTask = inputTaskTag.value;
    const dateCreate = getDate();

    if(!nameTask || !tagTask) {
        alert("Por favor, preencha todos os campos para criar uma tarefa!")
        return
    }

    createDivTask(nameTask, tagTask, dateCreate);

    
     inputTaskName.value = '';
     inputTaskTag.value = '';
}

function createDivTask(title, tag, dateCreate) {
    const divCardsTaskContainer = document.createElement('div');
    const divCardTask = document.createElement('div');
    const divCardTexts = document.createElement('div');
    const titleTask = document.createElement('h3');
    const divCardInfos = document.createElement('div');
    const divCardTag = document.createElement('div');
    const cardTag = document.createElement('p');
    const cardDate = document.createElement('p');
    const buttonDone = document.createElement('button');

    divCardsTaskContainer.classList.add('div-cards-taks');
    divCardTask.classList.add('card-task');
    divCardTexts.classList.add('card-texts');
    divCardInfos.classList.add('card-infos');
    divCardTag.classList.add('div-card-tag');
    cardTag.classList.add('card-tag');
    cardDate.classList.add('card-date');

    titleTask.textContent = title;
    cardTag.textContent = tag;
    cardDate.textContent = `Criado em: ${dateCreate}`;
    buttonDone.textContent = "Concluir";

    divCardTag.appendChild(cardTag);

    divCardInfos.appendChild(divCardTag);
    divCardInfos.appendChild(cardDate);

    divCardTexts.appendChild(titleTask);
    divCardTexts.appendChild(divCardInfos);

    divCardTask.appendChild(divCardTexts);
    divCardTask.appendChild(buttonDone);

    divCardsTaskContainer.appendChild(divCardTask);
    buttonDone.addEventListener('click', () => checkTask(divCardTask));

    taskContainer.appendChild(divCardsTaskContainer);
}

function checkTask (element) {
    const isDone = element.classList.contains('task-done');

    isDone ? turnTaskUndone(element) : turnTaskDone(element); 
}

function turnTaskDone (element) {
    element.classList.add('task-done');

    const img = document.createElement('img');
    img.setAttribute('src', './images/ok.svg');
    img.addEventListener('click', () => checkTask(element));

    const parent = element.querySelector('.card-texts');
    const button = element.querySelector('button');

    button.classList.add('displayNone');
    
    parent.parentNode.insertBefore(img, parent.nextSibling);

    countTasksDone(1);
}

function turnTaskUndone(element) {
    element.classList.remove('task-done');

    const button = document.createElement('button');
    button.textContent = "Concluir";
    button.addEventListener('click', () => turnTaskDone(element));
    

    const parent = element.querySelector('.card-texts');
    const img = element.querySelector('img');

    img.classList.add('displayNone');

    parent.parentNode.insertBefore(button, parent.nextSibling);

    countTasksDone(-1);
}

function countTasksDone (value) {
    const p = document.getElementById('tasks-done');

    tasksDone = Math.max(0, tasksDone + value);

    p.textContent = `${tasksDone} tarefas concluidas`;
}

function getDate () {
    const date = new Date;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate(); 

    const dateFormatted = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    return dateFormatted;
}
import {
  TASK_TOTAL_AMOUNT,
  TASK_START_AMOUNT,
  TASK_LOAD_AMOUNT
} from "./const";

import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createTaskEditorTemplate} from "./components/task-editor";
import {createLoadButtonTemplate} from "./components/load-button";

import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const tasks = generateTasks(TASK_TOTAL_AMOUNT);
const filters = generateFilters(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, createMenuTemplate());
render(mainElement, createFilterTemplate(filters));
render(mainElement, createBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(taskListElement, createTaskEditorTemplate(tasks[0]));

render(boardElement, createLoadButtonTemplate());

const loadButton = boardElement.querySelector(`.load-more`);

let currentTaskAmount = TASK_START_AMOUNT;

const loadTasks = () => {
  const previousTaskAmount = currentTaskAmount;
  currentTaskAmount += TASK_LOAD_AMOUNT;

  tasks.slice(previousTaskAmount, currentTaskAmount)
    .forEach((task) => render(taskListElement, createTaskTemplate(task)));
};

const loadButtonClickHandler = () => {
  loadTasks();

  if (currentTaskAmount >= TASK_TOTAL_AMOUNT) {
    loadButton.remove();
  }
};

loadButton.addEventListener(`click`, loadButtonClickHandler);

tasks.slice(1, currentTaskAmount)
  .forEach((task) => render(taskListElement, createTaskTemplate(task)));

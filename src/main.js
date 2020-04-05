import {createMenuTemplate} from "./components/menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createTaskTemplate} from "./components/task";
import {createTaskEditorTemplate} from "./components/task-editor";
import {createLoadButtonTemplate} from "./components/load-button";

const TASK_AMOUNT = 3;

const render = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, createMenuTemplate());
render(mainElement, createFilterTemplate());
render(mainElement, createBoardTemplate());

const boardElement = mainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(taskListElement, createTaskEditorTemplate());

for (let i = 0; i < TASK_AMOUNT; i++) {
  render(taskListElement, createTaskTemplate());
}

render(boardElement, createLoadButtonTemplate());

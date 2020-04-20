import {
  RenderPosition,
  TASK_TOTAL_AMOUNT,
  TASK_START_AMOUNT,
  TASK_LOAD_AMOUNT
} from "./const";

import {render, checkEscKey} from "./utils";

import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import BoardComponent from "./components/board";
import SortComponent from "./components/sort";
import TaskListComponent from "./components/task-list";
import TaskComponent from "./components/task";
import EditorComponent from "./components/editor";
import LoadButtonComponent from "./components/load-button";

import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";

const tasks = generateTasks();
const filters = generateFilters(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, new MenuComponent().getElement());
render(mainElement, new FilterComponent(filters).getElement());

const renderTask = (taskListElement, task) => {
  const taskElement = new TaskComponent(task).getElement();
  const editorElement = new EditorComponent(task).getElement();

  const editButton = taskElement.querySelector(`.card__btn--edit`);
  const editForm = editorElement.querySelector(`form`);

  const editFormKeydownHandler = (evt) => {
    if (checkEscKey(evt.key)) {
      evt.preventDefault();
      editorElement.replaceWith(taskElement);
      document.removeEventListener(`keydown`, editFormKeydownHandler);
    }
  };

  const editButtonClickHandler = () => {
    taskElement.replaceWith(editorElement);
    document.addEventListener(`keydown`, editFormKeydownHandler);
  };

  const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    editorElement.replaceWith(taskElement);
    document.removeEventListener(`keydown`, editFormKeydownHandler);
  };

  editButton.addEventListener(`click`, editButtonClickHandler);
  editForm.addEventListener(`submit`, editFormSubmitHandler);

  render(taskListElement, taskElement, RenderPosition.BEFOREEND);
};

const renderBoard = () => {
  const boardElement = new BoardComponent().getElement();
  const taskListElement = new TaskListComponent().getElement();

  render(boardElement, new SortComponent().getElement());
  render(boardElement, taskListElement);

  let currentTaskAmount = TASK_START_AMOUNT;
  tasks.slice(0, currentTaskAmount).forEach((task) => renderTask(taskListElement, task));

  render(mainElement, boardElement);

  if (currentTaskAmount >= TASK_TOTAL_AMOUNT) {
    return;
  }

  const loadButtonComponent = new LoadButtonComponent();
  const loadButtonElement = loadButtonComponent.getElement();

  const loadTasks = () => {
    const previousTaskAmount = currentTaskAmount;
    currentTaskAmount += TASK_LOAD_AMOUNT;

    tasks.slice(previousTaskAmount, currentTaskAmount).forEach((task) => renderTask(taskListElement, task));
  };

  const loadButtonClickHandler = () => {
    loadTasks();

    if (currentTaskAmount >= TASK_TOTAL_AMOUNT) {
      loadButtonElement.remove();
      loadButtonComponent.removeElement();
    }
  };

  loadButtonElement.addEventListener(`click`, loadButtonClickHandler);
  render(boardElement, loadButtonElement);
};

renderBoard();

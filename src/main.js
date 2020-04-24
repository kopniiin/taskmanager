import {TASK_TOTAL_AMOUNT, TASK_START_AMOUNT, TASK_LOAD_AMOUNT} from "./const";

import {render, replace, remove} from "./utils/dom";
import {checkEscKey} from "./utils/keyboard";
import {checkIfAllTasksArchived} from "./utils/task";

import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import BoardComponent from "./components/board";
import NoTasksMessageComponent from "./components/no-tasks-message";
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

render(headerElement, new MenuComponent());
render(mainElement, new FilterComponent(filters));

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskComponent(task);
  const editorComponent = new EditorComponent(task);

  const editorKeydownHandler = (evt) => {
    if (checkEscKey(evt.key)) {
      evt.preventDefault();
      replace(editorComponent, taskComponent);
      document.removeEventListener(`keydown`, editorKeydownHandler);
    }
  };

  const editButtonClickHandler = () => {
    replace(taskComponent, editorComponent);
    document.addEventListener(`keydown`, editorKeydownHandler);
  };

  const editorSubmitHandler = (evt) => {
    evt.preventDefault();
    replace(editorComponent, taskComponent);
    document.removeEventListener(`keydown`, editorKeydownHandler);
  };

  taskComponent.setEditButtonClickHandler(editButtonClickHandler);
  editorComponent.setSubmitHandler(editorSubmitHandler);

  render(taskListElement, taskComponent);
};

const renderBoard = () => {
  const boardComponent = new BoardComponent();
  const boardElement = boardComponent.getElement();
  render(mainElement, boardComponent);

  if (checkIfAllTasksArchived(tasks)) {
    render(boardElement, new NoTasksMessageComponent());
    return;
  }

  const taskListComponent = new TaskListComponent();
  const taskListElement = taskListComponent.getElement();

  render(boardElement, new SortComponent());
  render(boardElement, taskListComponent);

  let currentTaskAmount = TASK_START_AMOUNT;
  tasks.slice(0, currentTaskAmount).forEach((task) => renderTask(taskListElement, task));

  if (currentTaskAmount >= TASK_TOTAL_AMOUNT) {
    return;
  }

  const loadButtonComponent = new LoadButtonComponent();

  const loadTasks = () => {
    const previousTaskAmount = currentTaskAmount;
    currentTaskAmount += TASK_LOAD_AMOUNT;

    tasks.slice(previousTaskAmount, currentTaskAmount).forEach((task) => renderTask(taskListElement, task));
  };

  const loadButtonClickHandler = () => {
    loadTasks();

    if (currentTaskAmount >= TASK_TOTAL_AMOUNT) {
      remove(loadButtonComponent);
    }
  };

  loadButtonComponent.setClickHandler(loadButtonClickHandler);
  render(boardElement, loadButtonComponent);
};

renderBoard();

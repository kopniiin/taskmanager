import {TASK_START_AMOUNT, TASK_LOAD_AMOUNT} from "../const";

import {render, replace, remove} from "../utils/dom";
import {checkEscKey} from "../utils/keyboard";
import {checkIfAllTasksArchived, sortTasks} from "../utils/task";

import NoTasksMessageComponent from "../components/no-tasks-message";
import SortComponent from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadButtonComponent from "../components/load-button";
import TaskComponent from "../components/task";
import EditorComponent from "../components/editor";

const renderTask = (taskListComponent, task) => {
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

  render(taskListComponent, taskComponent);
};

const renderTasks = (taskListComponent, tasks) => tasks.forEach((task) => renderTask(taskListComponent, task));

export default class BoardController {
  constructor(boardComponent) {
    this._boardComponent = boardComponent;

    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._loadButtonComponent = new LoadButtonComponent();
  }

  render(tasks) {
    if (checkIfAllTasksArchived(tasks)) {
      render(this._boardComponent, this._noTasksMessageComponent);
      return;
    }

    render(this._boardComponent, this._sortComponent);
    render(this._boardComponent, this._taskListComponent);

    let sortedTasks = [...tasks];
    let currentTaskAmount = TASK_START_AMOUNT;

    const loadTasks = () => {
      const previousTaskAmount = currentTaskAmount;
      currentTaskAmount += TASK_LOAD_AMOUNT;
      renderTasks(this._taskListComponent, sortedTasks.slice(previousTaskAmount, currentTaskAmount));
    };

    const loadButtonClickHandler = () => {
      loadTasks();

      if (currentTaskAmount >= tasks.length) {
        remove(this._loadButtonComponent);
      }
    };

    const rerenderLoadButton = () => {
      if (currentTaskAmount >= tasks.length) {
        return;
      }

      remove(this._loadButtonComponent);
      this._loadButtonComponent.setClickHandler(loadButtonClickHandler);
      render(this._boardComponent, this._loadButtonComponent);
    };

    const sortTypeChangeHandler = (sortType) => {
      this._taskListComponent.clear();

      sortedTasks = sortTasks(tasks, sortType);
      currentTaskAmount = TASK_START_AMOUNT;
      renderTasks(this._taskListComponent, sortedTasks.slice(0, currentTaskAmount));
      rerenderLoadButton();
    };

    renderTasks(this._taskListComponent, sortedTasks.slice(0, currentTaskAmount));
    rerenderLoadButton();

    this._sortComponent.setTypeChangeHandler(sortTypeChangeHandler);
  }
}

import {TASK_START_AMOUNT, TASK_LOAD_AMOUNT} from "../const";

import {replaceElements} from "../utils/common";
import {render, remove} from "../utils/dom";
import {checkIfAllTasksArchived, sortTasks} from "../utils/task";

import NoTasksMessageComponent from "../components/no-tasks-message";
import SortComponent from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadButtonComponent from "../components/load-button";

import TaskController from "./task";

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = null;
    this._sortedTasks = null;
    this._taskControllers = null;
    this._currentTaskAmount = TASK_START_AMOUNT;

    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._loadButtonComponent = new LoadButtonComponent();

    this._loadButtonClickHandler = this._loadButtonClickHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render(tasks) {
    this._tasks = tasks;

    if (checkIfAllTasksArchived(this._tasks)) {
      render(this._container, this._noTasksMessageComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._taskListComponent);

    this._sortedTasks = sortTasks(this._tasks, this._sortComponent.getType());
    this._taskControllers = this._createTaskControllers(this._sortedTasks.slice(0, this._currentTaskAmount));

    this._rerenderLoadButton();
  }

  _createTaskControllers(tasks) {
    return tasks.map((task) => {
      const taskController = new TaskController(
          task,
          this._taskListComponent,
          this._dataChangeHandler,
          this._viewChangeHandler
      );
      taskController.render();
      return taskController;
    });
  }

  _loadTasks() {
    const previousTaskAmount = this._currentTaskAmount;
    this._currentTaskAmount += TASK_LOAD_AMOUNT;
    this._taskControllers = this._taskControllers.concat(
        this._createTaskControllers(this._sortedTasks.slice(previousTaskAmount, this._currentTaskAmount))
    );
  }

  _loadButtonClickHandler() {
    this._loadTasks();

    if (this._currentTaskAmount >= this._tasks.length) {
      remove(this._loadButtonComponent);
    }
  }

  _rerenderLoadButton() {
    if (this._currentTaskAmount >= this._tasks.length) {
      return;
    }

    remove(this._loadButtonComponent);
    this._loadButtonComponent.setClickHandler(this._loadButtonClickHandler);
    render(this._container, this._loadButtonComponent);
  }

  _sortTypeChangeHandler(sortType) {
    this._taskListComponent.clear();

    this._sortedTasks = sortTasks(this._tasks, sortType);
    this._currentTaskAmount = TASK_START_AMOUNT;
    this._taskControllers = this._createTaskControllers(this._sortedTasks.slice(0, this._currentTaskAmount));

    this._rerenderLoadButton();
  }

  _dataChangeHandler(oldTask, newTask) {
    replaceElements(this._tasks, oldTask, newTask);
    replaceElements(this._sortedTasks, oldTask, newTask);
  }

  _viewChangeHandler() {
    this._taskControllers.forEach((taskController) => taskController.setDefaultView());
  }
}

import {DEFAULT_SORT_TYPE, TASK_START_AMOUNT, TASK_LOAD_AMOUNT} from "../const";

import {render, remove} from "../utils/dom";
import {checkIfAllTasksArchived} from "../utils/task";

import NoTasksMessageComponent from "../components/no-tasks-message";
import SortComponent from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadButtonComponent from "../components/load-button";

import TaskController from "./task";

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._currentTaskAmount = TASK_START_AMOUNT;
    this._taskControllers = [];

    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._loadButtonComponent = new LoadButtonComponent();

    this._loadButtonClickHandler = this._loadButtonClickHandler.bind(this);
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);

    this._tasksModel.setFilterTypeChangeHandler(this._filterTypeChangeHandler);
    this._sortComponent.setTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render() {
    if (checkIfAllTasksArchived(this._tasksModel.getTasks())) {
      render(this._container, this._noTasksMessageComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._taskListComponent);
    this._rerenderTasks();
    this._rerenderLoadButton();
  }

  _createTaskControllers(tasks) {
    this._taskControllers = this._taskControllers.concat(tasks.map((task) => {
      const taskController = new TaskController(
          task,
          this._taskListComponent,
          this._dataChangeHandler,
          this._viewChangeHandler
      );
      taskController.render();
      return taskController;
    }));
  }

  _rerenderTasks() {
    this._currentTaskAmount = TASK_START_AMOUNT;
    this._taskControllers.forEach((taskController) => taskController.remove());
    this._taskControllers = [];
    this._createTaskControllers(this._tasksModel.getTasks().slice(0, this._currentTaskAmount));
  }

  _loadTasks() {
    const previousTaskAmount = this._currentTaskAmount;
    this._currentTaskAmount += TASK_LOAD_AMOUNT;
    this._createTaskControllers(this._tasksModel.getTasks().slice(previousTaskAmount, this._currentTaskAmount));
  }

  _loadButtonClickHandler() {
    this._loadTasks();

    if (this._currentTaskAmount >= this._tasksModel.getTasks().length) {
      remove(this._loadButtonComponent);
    }
  }

  _rerenderLoadButton() {
    remove(this._loadButtonComponent);

    if (this._currentTaskAmount >= this._tasksModel.getTasks().length) {
      return;
    }

    this._loadButtonComponent.setClickHandler(this._loadButtonClickHandler);
    render(this._container, this._loadButtonComponent);
  }

  _filterTypeChangeHandler() {
    this._sortComponent.setDefaultType();
    this._tasksModel.setSortType(DEFAULT_SORT_TYPE);
    this._rerenderTasks();
    this._rerenderLoadButton();
  }

  _sortTypeChangeHandler(sortType) {
    this._tasksModel.setSortType(sortType);
    this._rerenderTasks();
    this._rerenderLoadButton();
  }

  _dataChangeHandler(oldTask, newTask) {
    this._tasksModel.updateTask(oldTask.id, newTask);
  }

  _viewChangeHandler() {
    this._taskControllers.forEach((taskController) => taskController.setDefaultView());
  }
}

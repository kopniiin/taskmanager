import {DEFAULT_FILTER_TYPE, DEFAULT_SORT_TYPE} from "../const";

import {filterTasks} from "../utils/filter";
import {sortTasks} from "../utils/sort";

export default class Tasks {
  constructor() {
    this._tasks = [];

    this._filterType = DEFAULT_FILTER_TYPE;
    this._sortType = DEFAULT_SORT_TYPE;

    this._dataChangeHandlers = [];
    this._filterTypeChangeHandlers = [];
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  getTasks() {
    return sortTasks(filterTasks(this._tasks, this._filterType), this._sortType);
  }

  getAllTasks() {
    return this._tasks;
  }

  updateTask(id, newTask) {
    const index = this._tasks.findIndex((task) => task.id === id);
    this._tasks = [...this._tasks.slice(0, index), newTask, ...this._tasks.slice(index + 1)];
    this._callHandlers(this._dataChangeHandlers);
  }

  setFilterType(filterType) {
    this._filterType = filterType;
    this._callHandlers(this._filterTypeChangeHandlers);
  }

  setSortType(sortType) {
    this._sortType = sortType;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterTypeChangeHandler(handler) {
    this._filterTypeChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

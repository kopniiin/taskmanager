import {DEFAULT_SORT_TYPE} from "../const";

import {sortTasks} from "../utils/sort";

export default class Tasks {
  constructor() {
    this._tasks = [];

    this._sortType = DEFAULT_SORT_TYPE;

    this._dataChangeHandlers = [];
  }

  setTasks(tasks) {
    this._tasks = tasks;
  }

  getTasks() {
    return sortTasks(this._tasks, this._sortType);
  }

  updateTask(id, newTask) {
    const index = this._tasks.findIndex((task) => task.id === id);
    this._tasks = [...this._tasks.slice(0, index), newTask, ...this._tasks.slice(index + 1)];
    this._callHandlers(this._dataChangeHandlers);
  }

  setSort(sortType) {
    this._sortType = sortType;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

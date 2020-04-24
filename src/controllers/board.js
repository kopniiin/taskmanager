import {TASK_TOTAL_AMOUNT, TASK_START_AMOUNT, TASK_LOAD_AMOUNT} from "../const";

import {render, replace, remove} from "../utils/dom";
import {checkEscKey} from "../utils/keyboard";
import {checkIfAllTasksArchived} from "../utils/task";

import NoTasksMessageComponent from "../components/no-tasks-message";
import SortComponent from "../components/sort";
import TaskListComponent from "../components/task-list";
import LoadButtonComponent from "../components/load-button";
import TaskComponent from "../components/task";
import EditorComponent from "../components/editor";

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

export default class BoardController {
  constructor(boardComponent) {
    this._boardComponent = boardComponent;

    this._noTasksMessageComponent = new NoTasksMessageComponent();
    this._sortComponent = new SortComponent();
    this._taskListComponent = new TaskListComponent();
    this._loadButtonComponent = new LoadButtonComponent();
  }

  render(tasks) {
    const boardElement = this._boardComponent.getElement();

    if (checkIfAllTasksArchived(tasks)) {
      render(boardElement, this._noTasksMessageComponent);
      return;
    }

    render(boardElement, this._sortComponent);
    render(boardElement, this._taskListComponent);
    render(boardElement, this._loadButtonComponent);

    const taskListElement = this._taskListComponent.getElement();

    let currentTaskAmount = TASK_START_AMOUNT;

    const loadTasks = () => {
      const previousTaskAmount = currentTaskAmount;
      currentTaskAmount += TASK_LOAD_AMOUNT;

      tasks.slice(previousTaskAmount, currentTaskAmount).forEach((task) => renderTask(taskListElement, task));
    };

    const loadButtonClickHandler = () => {
      loadTasks();

      if (currentTaskAmount >= TASK_TOTAL_AMOUNT) {
        remove(this._loadButtonComponent);
      }
    };

    this._loadButtonComponent.setClickHandler(loadButtonClickHandler);

    tasks.slice(0, currentTaskAmount).forEach((task) => renderTask(taskListElement, task));
  }
}

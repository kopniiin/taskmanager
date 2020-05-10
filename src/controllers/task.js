import {TaskViewMode} from "../const";

import {render, replace, remove} from "../utils/dom";
import {checkEscKey} from "../utils/keyboard";

import TaskComponent from "../components/task";
import EditorComponent from "../components/editor";

export default class TaskController {
  constructor(task, container, dataChangeHandler, viewChangeHandler) {
    this._task = task;
    this._taskComponent = null;
    this._editorComponent = null;

    this._container = container;

    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._viewMode = TaskViewMode.DEFAULT;

    this._editorKeydownHandler = this._editorKeydownHandler.bind(this);
    this._editorSubmitHandler = this._editorSubmitHandler.bind(this);
    this._editButtonClickHandler = this._editButtonClickHandler.bind(this);
    this._archiveButtonClickHandler = this._archiveButtonClickHandler.bind(this);
    this._favoritesButtonClickHandler = this._favoritesButtonClickHandler.bind(this);
  }

  render() {
    const oldTaskComponent = this._taskComponent;
    const oldEditorComponent = this._editorComponent;

    this._taskComponent = new TaskComponent(this._task);
    this._editorComponent = new EditorComponent(this._task);

    this._taskComponent.setEditButtonClickHandler(this._editButtonClickHandler);
    this._taskComponent.setArchiveButtonClickHandler(this._archiveButtonClickHandler);
    this._taskComponent.setFavoritesButtonClickHandler(this._favoritesButtonClickHandler);
    this._editorComponent.setSubmitHandler(this._editorSubmitHandler);

    if (oldTaskComponent) {
      replace(oldTaskComponent, this._taskComponent);
      replace(oldEditorComponent, this._editorComponent);
    } else {
      render(this._container, this._taskComponent);
    }
  }

  remove() {
    remove(this._taskComponent);
    remove(this._editorComponent);
    this._taskComponent = null;
    this._editorComponent = null;
    document.removeEventListener(`keydown`, this._editorKeydownHandler);
  }

  setDefaultView() {
    if (this._viewMode === TaskViewMode.EDITOR) {
      this._replaceEditorWithTask();
    }
  }

  _replaceTaskWithEditor() {
    this._viewChangeHandler();
    this._viewMode = TaskViewMode.EDITOR;
    replace(this._taskComponent, this._editorComponent);
    document.addEventListener(`keydown`, this._editorKeydownHandler);
  }

  _replaceEditorWithTask() {
    this._editorComponent.reset();
    this._viewMode = TaskViewMode.DEFAULT;
    replace(this._editorComponent, this._taskComponent);
    document.removeEventListener(`keydown`, this._editorKeydownHandler);
  }

  _editorKeydownHandler(evt) {
    if (checkEscKey(evt.key)) {
      evt.preventDefault();
      this._replaceEditorWithTask();
    }
  }

  _editorSubmitHandler(evt) {
    evt.preventDefault();
    this._replaceEditorWithTask();
  }

  _editButtonClickHandler() {
    this._replaceTaskWithEditor();
  }

  _toggleTaskProperty(property) {
    const oldTask = this._task;
    this._task = Object.assign({}, oldTask, {[property]: !oldTask[property]});
    this._dataChangeHandler(oldTask, this._task);
    this.render();
  }

  _archiveButtonClickHandler() {
    this._toggleTaskProperty(`isArchive`);
  }

  _favoritesButtonClickHandler() {
    this._toggleTaskProperty(`isFavorite`);
  }
}

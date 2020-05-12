import {RenderPosition, TaskViewMode} from "../const";

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
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._editButtonClickHandler = this._editButtonClickHandler.bind(this);
    this._archiveButtonClickHandler = this._archiveButtonClickHandler.bind(this);
    this._favoritesButtonClickHandler = this._favoritesButtonClickHandler.bind(this);
  }

  render(viewMode = TaskViewMode.DEFAULT) {
    this._viewMode = viewMode;

    this._taskComponent = new TaskComponent(this._task);
    this._editorComponent = new EditorComponent(this._task);

    this._setHandlers();

    switch (this._viewMode) {
      case TaskViewMode.DEFAULT:
        render(this._container, this._taskComponent);
        break;
      case TaskViewMode.CREATOR:
        render(this._container, this._editorComponent, RenderPosition.AFTERBEGIN);
        document.addEventListener(`keydown`, this._editorKeydownHandler);
        break;
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
    if (this._viewMode !== TaskViewMode.DEFAULT) {
      this._replaceEditorWithTask();
    }
  }

  _setHandlers() {
    this._taskComponent.setEditButtonClickHandler(this._editButtonClickHandler);
    this._taskComponent.setArchiveButtonClickHandler(this._archiveButtonClickHandler);
    this._taskComponent.setFavoritesButtonClickHandler(this._favoritesButtonClickHandler);
    this._editorComponent.setSubmitHandler(this._editorSubmitHandler);
    this._editorComponent.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
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

      if (this._viewMode === TaskViewMode.CREATOR) {
        this._dataChangeHandler(null, null);
        return;
      }

      this._replaceEditorWithTask();
    }
  }

  _editorSubmitHandler(evt) {
    evt.preventDefault();

    if (this._viewMode === TaskViewMode.CREATOR) {
      this._dataChangeHandler(null, this._editorComponent.getData());
    } else {
      this._dataChangeHandler(this._task, this._editorComponent.getData());
    }
  }

  _deleteButtonClickHandler() {
    if (this._viewMode === TaskViewMode.CREATOR) {
      this._dataChangeHandler(null, null);
    } else {
      this._dataChangeHandler(this._task, null);
    }
  }

  _editButtonClickHandler() {
    this._replaceTaskWithEditor();
  }

  _toggleTaskProperty(property) {
    this._dataChangeHandler(this._task, Object.assign({}, this._task, {[property]: !this._task[property]}));
  }

  _archiveButtonClickHandler() {
    this._toggleTaskProperty(`isArchive`);
  }

  _favoritesButtonClickHandler() {
    this._toggleTaskProperty(`isFavorite`);
  }
}

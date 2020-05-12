import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";

import {DAYS, TaskDescriptionLengthLimit, TASK_DEFAULT_REPEATING_DAYS, TASK_COLORS} from "../const";

import {checkIfSomeElementsTruthy, checkIfElementInRange} from "../utils/common";
import {checkIfTaskExpired, checkIfTaskRepeating} from "../utils/task";

import AbstractSmartComponent from "./abstract-smart-component";

const createColorMarkup = (color, isChecked) => (
  `<input
    type="radio"
    id="color-${color}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${isChecked ? `checked` : ``}/>

  <label
    for="color-${color}"
    class="card__color card__color--${color}">
    ${color}
  </label>`
);

const createColorsMarkup = (currentColor) => (
  `<div class="card__colors-inner">
    <h3 class="card__colors-title">Color</h3>
    <div class="card__colors-wrap">
      ${TASK_COLORS.map((color) => createColorMarkup(color, color === currentColor)).join(``)}
    </div>
  </div>`
);

const createDayMarkup = (day, isChecked) => (
  `<input
    class="card__repeat-day-input visually-hidden"
    type="checkbox"
    id="repeat-${day}"
    name="repeat"
    value="${day}"
    ${isChecked ? `checked` : ``}/>

  <label
    class="card__repeat-day"
    for="repeat-${day}">
    ${day}
  </label>`
);

const createDaysMarkup = (repeatingDays) => (
  `<fieldset class="card__repeat-days">
    <div class="card__repeat-days-inner">
      ${DAYS.map((day) => createDayMarkup(day, repeatingDays[day])).join(``)}
    </div>
  </fieldset>`
);

const createDeadlineMarkup = () => (
  `<fieldset class="card__date-deadline">
    <label class="card__input-deadline-wrap">
      <input
        class="card__date"
        type="text"
        placeholder=""
        name="date"/>
    </label>
  </fieldset>`
);

const createEditorTemplate = (task, parameters) => {
  const {color} = task;
  const {description, hasDeadline, isRepeating, repeatingDays} = parameters;

  const encodedDescription = encode(description);

  const isExpired = checkIfTaskExpired(task);
  const isSubmitButtonDisabled = (hasDeadline && isRepeating) ||
    (isRepeating && !checkIfSomeElementsTruthy(Object.values(repeatingDays))) ||
    !checkIfElementInRange(encodedDescription.length, TaskDescriptionLengthLimit);

  return (
    `<article
      class="card card--edit card--${color} ${isRepeating ? `card--repeat` : ``} ${isExpired ? `card--deadline` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text">${encodedDescription}</textarea>
            </label>
          </div>

          <div class="card__settings">

            <div class="card__details">
              <div class="card__dates">

                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${hasDeadline ? `yes` : `no`}</span>
                </button>

                ${hasDeadline ? createDeadlineMarkup() : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                </button>

                ${isRepeating ? createDaysMarkup(repeatingDays) : ``}

              </div>
            </div>

            ${createColorsMarkup(color)}

          </div>

          <div class="card__status-btns">
            <button
              class="card__save"
              type="submit"
              ${isSubmitButtonDisabled ? `disabled` : ``}>
              save
            </button>

            <button class="card__delete" type="button">delete</button>
          </div>

        </div>
      </form>
    </article>`
  );
};

const parseFormData = (formData) => {
  const date = formData.get(`date`);

  const repeatingDays = formData.getAll(`repeat`).reduce((acc, repeatingDay) => {
    acc[repeatingDay] = true;
    return acc;
  }, Object.assign({}, TASK_DEFAULT_REPEATING_DAYS));

  return {
    description: formData.get(`text`),
    dueDate: date ? new Date(date) : null,
    repeatingDays,
    color: formData.get(`color`)
  };
};

export default class Editor extends AbstractSmartComponent {
  constructor(task) {
    super();

    this._task = task;

    this._description = this._task.description;
    this._hasDeadline = Boolean(this._task.dueDate);
    this._isRepeating = checkIfTaskRepeating(this._task);
    this._repeatingDays = Object.assign({}, this._task.repeatingDays);

    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._descriptionInputHandler = this._descriptionInputHandler.bind(this);
    this._deadlineToggleClickHandler = this._deadlineToggleClickHandler.bind(this);
    this._repeatToggleClickHandler = this._repeatToggleClickHandler.bind(this);
    this._repeatingDaysChangeHandler = this._repeatingDaysChangeHandler.bind(this);

    this._datePicker = null;

    this._recoveryHandlers();
    this._createDatePicker();
  }

  getTemplate() {
    return createEditorTemplate(this._task, {
      description: this._description,
      hasDeadline: this._hasDeadline,
      isRepeating: this._isRepeating,
      repeatingDays: this._repeatingDays
    });
  }

  removeElement() {
    if (this._datePicker) {
      this._datePicker.destroy();
      this._datePicker = null;
    }

    super.removeElement();
  }

  rerender() {
    super.rerender();
    this._createDatePicker();
  }

  reset() {
    this._description = this._task.description;
    this._hasDeadline = Boolean(this._task.dueDate);
    this._isRepeating = checkIfTaskRepeating(this._task);
    this._repeatingDays = Object.assign({}, this._task.repeatingDays);

    this.rerender();
  }

  getData() {
    return parseFormData(new FormData(this.getElement().querySelector(`form`)));
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this._deleteButtonClickHandler = handler;
    this.getElement().querySelector(`.card__delete`).addEventListener(`click`, this._deleteButtonClickHandler);
  }

  _descriptionInputHandler(evt) {
    this._description = evt.target.value;
    this.getElement().querySelector(`.card__save`).disabled = !checkIfElementInRange(
        this._description.length, TaskDescriptionLengthLimit
    );
  }

  _deadlineToggleClickHandler() {
    this._hasDeadline = !this._hasDeadline;
    this.rerender();
  }

  _repeatToggleClickHandler() {
    this._isRepeating = !this._isRepeating;
    this.rerender();
  }

  _repeatingDaysChangeHandler(evt) {
    this._repeatingDays[evt.target.value] = evt.target.checked;
    this.rerender();
  }

  _recoveryHandlers() {
    if (this._submitHandler) {
      this.setSubmitHandler(this._submitHandler);
    }

    if (this._deleteButtonClickHandler) {
      this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    }

    const element = this.getElement();
    const repeatingDaysElement = element.querySelector(`.card__repeat-days`);

    element.querySelector(`.card__text`).addEventListener(`input`, this._descriptionInputHandler);
    element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._deadlineToggleClickHandler);
    element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._repeatToggleClickHandler);

    if (repeatingDaysElement) {
      repeatingDaysElement.addEventListener(`change`, this._repeatingDaysChangeHandler);
    }
  }

  _createDatePicker() {
    if (this._datePicker) {
      this._datePicker.destroy();
      this._datePicker = null;
    }

    if (!this._hasDeadline) {
      return;
    }

    const dateElement = this.getElement().querySelector(`.card__date`);
    this._datePicker = flatpickr(dateElement, {
      enableTime: true,
      defaultDate: this._task.dueDate || new Date(),
      altInput: true,
      altFormat: `j F H:i`
    });
  }
}

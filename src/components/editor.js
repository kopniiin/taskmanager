import {
  DAYS,
  TASK_DEFAULT_REPEATING_DAYS,
  TASK_COLORS,
  TASK_DEFAULT_COLOR
} from "../const";

import {
  formatDate,
  formatTime,
  checkIfTaskExpired,
  checkIfTaskRepeating
} from "../utils";

import AbstractComponent from "./abstract-component";

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

const createDeadlineMarkup = (deadline) => (
  `<fieldset class="card__date-deadline">
    <label class="card__input-deadline-wrap">
      <input
        class="card__date"
        type="text"
        placeholder=""
        name="date"
        value="${formatDate(deadline)} ${formatTime(deadline)}"/>
    </label>
  </fieldset>`
);

const createEditorTemplate = (task) => {
  const {
    description,
    dueDate,
    repeatingDays = TASK_DEFAULT_REPEATING_DAYS,
    color = TASK_DEFAULT_COLOR
  } = task;

  const isExpired = checkIfTaskExpired(task);
  const isRepeating = checkIfTaskRepeating(task);

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
                name="text">${description}</textarea>
            </label>
          </div>

          <div class="card__settings">

            <div class="card__details">
              <div class="card__dates">

                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isRepeating ? `no` : `yes`}</span>
                </button>

                ${isRepeating ? `` : createDeadlineMarkup(dueDate)}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                </button>

                ${isRepeating ? createDaysMarkup(repeatingDays) : ``}

              </div>
            </div>

            ${createColorsMarkup(color)}

          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>

        </div>
      </form>
    </article>`
  );
};

export default class Editor extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createEditorTemplate(this._task);
  }
}

import {formatDate, formatTime} from "../utils/date";
import {checkIfTaskExpired, checkIfTaskRepeating} from "../utils/task";

import AbstractComponent from "./abstract-component";

const createTaskTemplate = (task) => {
  const {description, dueDate, color, isFavorite, isArchive} = task;

  const isExpired = checkIfTaskExpired(task);
  const isRepeating = checkIfTaskRepeating(task);

  return (
    `<article
      class="card card--${color} ${isRepeating ? `card--repeat` : ``} ${isExpired ? `card--deadline` : ``}">
      <div class="card__form">
        <div class="card__inner">

          <div class="card__control">
            <button
              type="button"
              class="card__btn card__btn--edit">
              edit
            </button>
            <button
              type="button"
              class="card__btn card__btn--archive ${isArchive ? `` : `card__btn--disabled`}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${isFavorite ? `` : `card__btn--disabled`}">
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${dueDate ? formatDate(dueDate) : ``}</span>
                    <span class="card__time">${dueDate ? formatTime(dueDate) : ``}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return createTaskTemplate(this._task);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, handler);
  }
}

import {SortType} from "../const";

import AbstractComponent from "./abstract-component";

const createSortTemplate = () => (
  `<div class="board__filter-list">

    <a
      href="#"
      class="board__filter"
      data-sort-type="${SortType.DEFAULT}">
      SORT BY DEFAULT
    </a>

    <a
      href="#"
      class="board__filter"
      data-sort-type="${SortType.DATE_UP}">
      SORT BY DATE up
    </a>

    <a
      href="#"
      class="board__filter"
      data-sort-type="${SortType.DATE_DOWN}">
      SORT BY DATE down
    </a>

  </div>`
);

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._type = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getType() {
    return this._type;
  }

  setTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (!evt.target.classList.contains(`board__filter`)) {
        return;
      }

      evt.preventDefault();

      const type = evt.target.dataset.sortType;

      if (this._type === type) {
        return;
      }

      this._type = type;
      handler(this._type);
    });
  }
}

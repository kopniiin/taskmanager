import {DEFAULT_FILTER} from "../const";

import {createElementFromTemplate} from "../utils";

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}/>

    <label
      for="filter__${name}"
      class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span>
    </label>`
  );
};

const createFilterTemplate = (filters) => (
  `<section class="main__filter filter container">
    ${filters.map((filter) => createFilterMarkup(filter, filter.name === DEFAULT_FILTER)).join(``)}
  </section>`
);

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

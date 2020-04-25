import {DEFAULT_FILTER} from "../const";

import AbstractComponent from "./abstract-component";

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

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }
}

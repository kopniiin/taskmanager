import {DEFAULT_FILTER_TYPE} from "../const";

import AbstractComponent from "./abstract-component";

const createFilterMarkup = (filter) => {
  const {name, counter, isChecked} = filter;

  return (
    `<input
      class="filter__input visually-hidden"
      id="filter__${name}"
      type="radio"
      name="filter"
      value="${name}"
      ${isChecked ? `checked` : ``}
      ${!counter ? `disabled` : ``}/>

    <label
      class="filter__label"
      for="filter__${name}">
      ${name} <span class="filter__${name}-count">${counter}</span>
    </label>`
  );
};

const createFilterTemplate = (filters) => (
  `<section class="main__filter filter container">
    ${filters.map(createFilterMarkup).join(``)}
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

  setDefaultType() {
    this.getElement().querySelector(`[value="${DEFAULT_FILTER_TYPE}"]`).checked = true;
  }

  setTypeChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => handler(evt.target.value));
  }
}

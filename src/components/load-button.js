import {createElementFromTemplate} from "../utils";

const createLoadButtonTemplate = () => (
  `<button
    class="load-more"
    type="button">
    load more
  </button>`
);

export default class LoadButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createLoadButtonTemplate();
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

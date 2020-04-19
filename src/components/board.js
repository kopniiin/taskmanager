import {createElementFromTemplate} from "../utils";

const createBoardTemplate = () => `<section class="board container"></section>`;

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoardTemplate();
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

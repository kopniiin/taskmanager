import {createElementFromTemplate} from "../utils";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate abstract class: AbstractComponent`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Can't call abstract method: getTemplate`);
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

import {createElementFromTemplate} from "../utils";

const createMessageTemplate = () => (
  `<p class="board__no-tasks">
    Click «ADD NEW TASK» in menu to create your first task
  </p>`
);

export default class NoTasksMessage {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMessageTemplate();
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

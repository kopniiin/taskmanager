import AbstractComponent from "./abstract-component";

const createLoadButtonTemplate = () => (
  `<button
    class="load-more"
    type="button">
    load more
  </button>`
);

export default class LoadButton extends AbstractComponent {
  getTemplate() {
    return createLoadButtonTemplate();
  }
}

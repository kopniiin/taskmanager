import {RenderPosition} from "../const";

export const createElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, component, position = RenderPosition.BEFOREEND) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const replace = (oldComponent, newComponent) => {
  oldComponent.getElement().replaceWith(newComponent.getElement());
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

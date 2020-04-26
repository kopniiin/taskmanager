import {RenderPosition} from "../const";

import AbstractComponent from "../components/abstract-component";

export const createElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (parent, child, position = RenderPosition.BEFOREEND) => {
  const parentElement = parent instanceof AbstractComponent ? parent.getElement() : parent;
  const childElement = child instanceof AbstractComponent ? child.getElement() : child;

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      parentElement.prepend(childElement);
      break;
    case RenderPosition.BEFOREEND:
      parentElement.append(childElement);
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

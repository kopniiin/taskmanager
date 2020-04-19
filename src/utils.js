import {MONTHS, RenderPosition} from "./const";

export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomInteger = (max) => Math.floor(Math.random() * max);

export const getRandomElement = (array) => array[getRandomInteger(array.length)];

export const formatDate = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]}`;

export const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, `0`);
  const minutes = String(date.getMinutes()).padStart(2, `0`);

  return `${hours}:${minutes}`;
};

export const checkIfTaskExpired = (task) => {
  const deadline = task.dueDate;
  return deadline instanceof Date && deadline < Date.now();
};

export const checkIfTaskExpiresToday = (task) => {
  const deadline = task.dueDate;
  const today = new Date();

  return deadline instanceof Date &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getDate() === today.getDate();
};

export const checkIfTaskRepeating = (task) => Object.values(task.repeatingDays).some(Boolean);

export const createElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};

export const render = (container, element, position = RenderPosition.BEFOREEND) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

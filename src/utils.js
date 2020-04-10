import {MONTHS} from "./const";

const getRandomBoolean = () => Math.random() > 0.5;

const getRandomInteger = (max) => Math.floor(Math.random() * max);

const getRandomElement = (array) => array[getRandomInteger(array.length)];

const formatDate = (date) => `${date.getDate()} ${MONTHS[date.getMonth()]}`;

const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, `0`);
  const minutes = String(date.getMinutes()).padStart(2, `0`);

  return `${hours}:${minutes}`;
};

const checkIfTaskExpired = (task) => {
  const deadline = task.dueDate;
  return deadline instanceof Date && deadline < Date.now();
};

const checkIfTaskExpiresToday = (task) => {
  const deadline = task.dueDate;
  const today = new Date();

  return deadline instanceof Date &&
    deadline.getMonth() === today.getMonth() &&
    deadline.getDate() === today.getDate();
};

const checkIfTaskRepeating = (task) => Object.values(task.repeatingDays).some(Boolean);

export {
  getRandomBoolean,
  getRandomInteger,
  getRandomElement,
  formatDate,
  formatTime,
  checkIfTaskExpired,
  checkIfTaskExpiresToday,
  checkIfTaskRepeating
};

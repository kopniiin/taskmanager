import {checkIfSomeElementsTruthy} from "./common";

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

export const checkIfTaskRepeating = (task) => checkIfSomeElementsTruthy(Object.values(task.repeatingDays));

export const checkIfAllTasksArchived = (tasks) => tasks.every((task) => task.isArchive);

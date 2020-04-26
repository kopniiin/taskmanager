import {SortType} from "../const";

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

export const checkIfAllTasksArchived = (tasks) => tasks.every((task) => task.isArchive);

export const sortTasks = (tasks, sortType) => {
  const tasksCopy = [...tasks];
  let sortedTasks;

  switch (sortType) {
    case SortType.DEFAULT:
      sortedTasks = tasksCopy;
      break;
    case SortType.DATE_UP:
      sortedTasks = tasksCopy.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = tasksCopy.sort((a, b) => b.dueDate - a.dueDate);
      break;
  }

  return sortedTasks;
};

import {SortType} from "../const";

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

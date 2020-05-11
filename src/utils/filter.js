import {FilterType} from "../const";

import {checkIfTaskExpired, checkIfTaskExpiresToday, checkIfTaskRepeating} from "./task";

const getArchivedTasks = (tasks) => tasks.filter((task) => task.isArchive);
const getNonArchivedTasks = (tasks) => tasks.filter((task) => !task.isArchive);
const getOverdueTasks = (tasks) => tasks.filter((task) => !task.isArchive && checkIfTaskExpired(task));
const getTodayTasks = (tasks) => tasks.filter((task) => !task.isArchive && checkIfTaskExpiresToday(task));
const getFavoriteTasks = (tasks) => tasks.filter((task) => !task.isArchive && task.isFavorite);
const getRepeatingTasks = (tasks) => tasks.filter((task) => !task.isArchive && checkIfTaskRepeating(task));

export const filterTasks = (tasks, filterType) => {
  let filteredTasks;

  switch (filterType) {
    case FilterType.ALL:
      filteredTasks = getNonArchivedTasks(tasks);
      break;
    case FilterType.OVERDUE:
      filteredTasks = getOverdueTasks(tasks);
      break;
    case FilterType.TODAY:
      filteredTasks = getTodayTasks(tasks);
      break;
    case FilterType.FAVORITES:
      filteredTasks = getFavoriteTasks(tasks);
      break;
    case FilterType.REPEATING:
      filteredTasks = getRepeatingTasks(tasks);
      break;
    case FilterType.ARCHIVE:
      filteredTasks = getArchivedTasks(tasks);
      break;
  }

  return filteredTasks;
};

export const countTasksForEachFilter = (tasks) => {
  const filtersToCounters = {};

  Object.values(FilterType).forEach((filterType) => {
    filtersToCounters[filterType] = 0;
  });

  tasks.forEach((task) => {
    if (task.isArchive) {
      filtersToCounters[FilterType.ARCHIVE]++;
      return;
    } else {
      filtersToCounters[FilterType.ALL]++;
    }

    if (checkIfTaskExpired(task)) {
      filtersToCounters[FilterType.OVERDUE]++;
    }

    if (checkIfTaskExpiresToday(task)) {
      filtersToCounters[FilterType.TODAY]++;
    }

    if (task.isFavorite) {
      filtersToCounters[FilterType.FAVORITES]++;
    }

    if (checkIfTaskRepeating(task)) {
      filtersToCounters[FilterType.REPEATING]++;
    }
  });

  return filtersToCounters;
};

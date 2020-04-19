import {FILTERS} from "../const";

import {
  checkIfTaskExpired,
  checkIfTaskExpiresToday,
  checkIfTaskRepeating
} from "../utils";

const countTasks = (tasks) => {
  const counters = {};

  FILTERS.forEach((name) => {
    counters[name] = 0;
  });

  tasks.forEach((task) => {
    counters.all++;

    counters.overdue = checkIfTaskExpired(task) ?
      counters.overdue + 1 : counters.overdue;

    counters.today = checkIfTaskExpiresToday(task) ?
      counters.today + 1 : counters.today;

    counters.repeating = checkIfTaskRepeating(task) ?
      counters.repeating + 1 : counters.repeating;

    counters.favorites = task.isFavorite ?
      counters.favorites + 1 : counters.favorites;

    counters.archive = task.isArchive ?
      counters.archive + 1 : counters.archive;
  });

  return counters;
};

export const generateFilters = (tasks) => {
  const taskCounters = countTasks(tasks);

  return FILTERS.map((name) => ({
    name,
    count: taskCounters[name]
  }));
};

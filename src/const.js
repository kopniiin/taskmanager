const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const FILTER_NAMES = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `archive`
];

const TASK_TOTAL_AMOUNT = 20;

const TASK_START_AMOUNT = 8;

const TASK_LOAD_AMOUNT = 8;

const TASK_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const TASK_MAX_DATE_OFFSET = 8;

const TASK_DEFAULT_REPEATING_DAYS = {};

DAYS.forEach((day) => {
  TASK_DEFAULT_REPEATING_DAYS[day] = false;
});

const TASK_COLORS = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
];

const TASK_DEFAULT_COLOR = `black`;

export {
  DAYS,
  MONTHS,
  FILTER_NAMES,
  TASK_TOTAL_AMOUNT,
  TASK_START_AMOUNT,
  TASK_LOAD_AMOUNT,
  TASK_DESCRIPTIONS,
  TASK_MAX_DATE_OFFSET,
  TASK_DEFAULT_REPEATING_DAYS,
  TASK_COLORS,
  TASK_DEFAULT_COLOR
};

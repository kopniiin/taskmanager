export const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const ESC_KEY = `Escape`;

export const FILTERS = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];

export const DEFAULT_FILTER = `all`;

export const SortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`
};

export const DEFAULT_SORT_TYPE = SortType.DEFAULT;

export const TASK_TOTAL_AMOUNT = 20;

export const TASK_START_AMOUNT = 8;

export const TASK_LOAD_AMOUNT = 8;

export const TASK_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

export const TASK_MAX_DATE_OFFSET = 8;

export const TASK_DEFAULT_REPEATING_DAYS = {};

DAYS.forEach((day) => {
  TASK_DEFAULT_REPEATING_DAYS[day] = false;
});

export const TASK_COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

export const TASK_DEFAULT_COLOR = `black`;

export const TaskViewMode = {
  DEFAULT: `default`,
  EDITOR: `editor`
};

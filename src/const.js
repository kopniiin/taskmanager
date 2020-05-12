// Служебные константы
export const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const ESC_KEY = `Escape`;

// Константы меню
export const MenuItem = {
  NEW_TASK: `new-task`,
  TASKS: `tasks`,
  STATISTICS: `statistics`
};

// Константы фильтров
export const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`
};

export const DEFAULT_FILTER_TYPE = FilterType.ALL;

// Константы сортировки
export const SortType = {
  DEFAULT: `default`,
  DATE_UP: `date-up`,
  DATE_DOWN: `date-down`
};

export const DEFAULT_SORT_TYPE = SortType.DEFAULT;

// Константы задач
export const TASK_TOTAL_AMOUNT = 20;

export const TASK_START_AMOUNT = 8;

export const TASK_LOAD_AMOUNT = 8;

export const TASK_DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

export const TaskDescriptionLengthLimit = {MIN: 1, MAX: 140};

export const TASK_MAX_DATE_OFFSET = 8;

export const TASK_DEFAULT_REPEATING_DAYS = {};

DAYS.forEach((day) => {
  TASK_DEFAULT_REPEATING_DAYS[day] = false;
});

export const TaskColor = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`
};

export const TASK_COLORS = Object.values(TaskColor);

export const EMPTY_TASK = {
  description: ``,
  dueDate: null,
  repeatingDays: Object.assign({}, TASK_DEFAULT_REPEATING_DAYS),
  color: TaskColor.BLACK,
  isFavorite: false,
  isArchive: false
};

export const TaskViewMode = {
  DEFAULT: `default`,
  EDITOR: `editor`,
  CREATOR: `creator`
};

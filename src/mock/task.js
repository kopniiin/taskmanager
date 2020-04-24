import {
  TASK_TOTAL_AMOUNT,
  TASK_DESCRIPTIONS,
  TASK_MAX_DATE_OFFSET,
  TASK_DEFAULT_REPEATING_DAYS,
  TASK_COLORS
} from "../const";

import {getRandomBoolean, getRandomInteger, getRandomElement} from "../utils/common";

const generateDeadline = () => {
  const deadline = new Date();

  const deadlineOffset = getRandomInteger(TASK_MAX_DATE_OFFSET);
  const offsetSign = getRandomBoolean() ? 1 : -1;

  deadline.setDate(deadline.getDate() + deadlineOffset * offsetSign);

  return deadline;
};

const generateRepeatingDays = () => {
  const repeatingDays = Object.assign({}, TASK_DEFAULT_REPEATING_DAYS);

  for (const day of Object.keys(repeatingDays)) {
    repeatingDays[day] = getRandomBoolean();
  }

  return repeatingDays;
};

const generateTask = () => {
  const dueDate = getRandomBoolean() ? generateDeadline() : null;

  return {
    description: getRandomElement(TASK_DESCRIPTIONS),
    dueDate,
    repeatingDays: dueDate ? TASK_DEFAULT_REPEATING_DAYS : generateRepeatingDays(),
    color: getRandomElement(TASK_COLORS),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean()
  };
};

export const generateTasks = () => new Array(TASK_TOTAL_AMOUNT).fill(``).map(generateTask);

import {checkIfSomeElementsTruthy} from "./common";
import {checkIfPast, checkIfToday} from "./date";

export const checkIfTaskExpired = (task) => task.dueDate instanceof Date && checkIfPast(task.dueDate);

export const checkIfTaskExpiresToday = (task) => task.dueDate instanceof Date && checkIfToday(task.dueDate);

export const checkIfTaskRepeating = (task) => checkIfSomeElementsTruthy(Object.values(task.repeatingDays));

export const checkIfAllTasksArchived = (tasks) => tasks.every((task) => task.isArchive);

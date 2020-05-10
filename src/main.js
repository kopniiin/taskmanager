import {render} from "./utils/dom";

import TasksModel from "./models/tasks";

import MenuComponent from "./components/menu";
import FilterComponent from "./components/filter";
import BoardComponent from "./components/board";

import BoardController from "./controllers/board";

import {generateTasks} from "./mock/task";
import {generateFilters} from "./mock/filter";

const tasks = generateTasks();
const filters = generateFilters(tasks);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

render(headerElement, new MenuComponent());
render(mainElement, new FilterComponent(filters));
render(mainElement, boardComponent);

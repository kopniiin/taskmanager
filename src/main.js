import {MenuItem} from "./const";

import {render} from "./utils/dom";

import TasksModel from "./models/tasks";

import MenuComponent from "./components/menu";
import BoardComponent from "./components/board";

import FilterController from "./controllers/filter";
import BoardController from "./controllers/board";

import {generateTasks} from "./mock/task";

const mainElement = document.querySelector(`.main`);
const headerElement = mainElement.querySelector(`.main__control`);

const tasksModel = new TasksModel();
tasksModel.setTasks(generateTasks());

const filterController = new FilterController(mainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
boardController.render();

const menuComponent = new MenuComponent();

const menuItemChangeHandler = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      filterController.setDefaultType();
      boardController.createTask();
      menuComponent.setItem(MenuItem.TASKS);
      break;
  }
};

menuComponent.setItemChangeHandler(menuItemChangeHandler);

render(headerElement, menuComponent);
render(mainElement, boardComponent);

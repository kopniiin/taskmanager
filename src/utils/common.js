export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomInteger = (max) => Math.floor(Math.random() * max);

export const getRandomElement = (array) => array[getRandomInteger(array.length)];

export const replaceElements = (array, oldElement, newElement) => {
  array[array.indexOf(oldElement)] = newElement;
};

export const checkIfSomeElementsTruthy = (array) => array.some(Boolean);

export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomInteger = (max) => Math.floor(Math.random() * max);

export const getRandomElement = (array) => array[getRandomInteger(array.length)];

export const checkIfSomeElementsTruthy = (array) => array.some(Boolean);

export const checkIfElementInRange = (element, range) => element >= range.MIN && element <= range.MAX;

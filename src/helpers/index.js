export const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const sleep = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, ms));

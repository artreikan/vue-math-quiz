export const getItem = key => JSON.parse(localStorage.getItem(key));

export const setItem = (key, item) =>
  JSON.stringify(localStorage.setItem(key, item));

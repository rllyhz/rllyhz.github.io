import logger from "./logger";

const saveData = (key, data) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
};

const getData = (key) => {
  if (!window.localStorage) return null;

  const stringData = window.localStorage.getItem(key);
  let actualData = null;

  try {
    actualData = JSON.parse(stringData);
  } catch (e) {
    logger.error("Failed to parse json data from storage");
  }

  return actualData;
};

export {
  saveData,
  getData,
};

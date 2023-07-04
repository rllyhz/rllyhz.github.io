import { getData, saveData } from "../../utils/storage-helpers";

const Storage = {
  Keys: {
    landingAlertInfo: "landingAlertInfo",
  },

  getData,

  saveData,

  saveOneTimeValue: (key, newValue) => {
    const data = getData(key);
    if (!data) saveData(key, newValue);
  },

  getOneTimeValue: (key) => getData(key),
};

export default Storage;

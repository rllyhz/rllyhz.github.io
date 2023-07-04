/* eslint-disable no-console */
import { Config } from "../globals/config";

const InfoType = {
  Normal: 0,
  Success: 1,
  Warning: 2,
  Error: 3,
};

const createInfoUI = (type) => {
  switch (type) {
    case InfoType.Normal: {
      return "color: white; padding: 8px; background-color: #808080;";
    }
    case InfoType.Success: {
      return "color: white; padding: 8px; background-color: #008000;";
    }
    case InfoType.Warning: {
      return "color: white; padding: 8px; background-color: #808000;";
    }
    case InfoType.Error: {
      return "color: white; padding: 8px; background-color: #800000";
    }
    default:
      return "color: white; padding: 8px; background-color: #808080";
  }
};

const createLogUI = () => "color: #808080; padding: 8px;";

const log = (message) => {
  if (!Config.Mode.Production) {
    console.log(`%c${message}`, createLogUI());
  }
};

const info = (message, type = InfoType.Normal) => {
  if (!Config.Mode.Production) {
    console.info(`%c${message}`, createInfoUI(type));
  }
};

const warn = (message) => {
  if (!Config.Mode.Production) {
    info(message, InfoType.Warning);
  }
};

const error = (message) => {
  if (!Config.Mode.Production) {
    info(message, InfoType.Error);
  }
};

export default {
  log,
  info,
  warn,
  error,
};

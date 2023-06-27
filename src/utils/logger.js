import { Config } from "../globals/config";

const log = (message) => {
  if (!Config.Mode.Production) {
    console.log(message);
  }
};

const info = (message) => {
  if (!Config.Mode.Production) {
    console.info(message);
  }
};

const warn = (message) => {
  if (!Config.Mode.Production) {
    console.warn(message);
  }
};

const error = (message) => {
  if (!Config.Mode.Production) {
    console.error(message);
  }
};

export default {
  log,
  info,
  warn,
  error,
};

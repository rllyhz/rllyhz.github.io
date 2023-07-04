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

const _getCallerFile = () => {
  let filename = "unknown";

  const _pst = Error.prepareStackTrace;

  Error.prepareStackTrace = (err, stack) => stack;

  try {
    const err = new Error();
    let callerfile;
    const currentfile = err.stack.shift().getFileName();

    while (err.stack.length) {
      callerfile = err.stack.shift().getFileName();

      if (currentfile !== callerfile) {
        filename = callerfile;
        break;
      }
    }
  } catch (err) { /* empty */ }

  Error.prepareStackTrace = _pst;

  return filename;
};

const log = (message) => {
  if (!Config.Mode.Production) {
    const filenameCaller = _getCallerFile();
    console.log(`%c File: ${filenameCaller} \n=> ${message}`, createLogUI());
  }
};

const info = (message, type = InfoType.Normal) => {
  if (!Config.Mode.Production) {
    const filenameCaller = _getCallerFile();
    console.log(`%c File: ${filenameCaller} \n=> ${message}`, createInfoUI(type));
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

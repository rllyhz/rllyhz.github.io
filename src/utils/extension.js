import logger from "./logger";

class Observable {
  constructor({ observeAtFirstLaunch = false, initialValue = null }) {
    this.currentValue = initialValue;
    this.observeAtFirstLaunch = observeAtFirstLaunch;
    this.observers = [];
    this.isReleased = false;
  }

  observe(observer) {
    if (typeof observer !== "function") {
      logger.error("Observer must be a function");
      return;
    }

    this.observers.push(observer);

    if (this.observeAtFirstLaunch) {
      this.observers[this.observers.length - 1](this.value);
    }
  }

  emit(newValue) {
    if (this.isReleased) return this;

    this.currentValue = newValue;

    this.observers.forEach((obsvr) => {
      if (!this.isReleased) obsvr(newValue);
    });

    return this;
  }

  release() {
    this.isReleased = true;
    this.currentValue = null;
    this.observers.length = 0;
  }
}

const observableOf = (value) => new Observable({
  initialValue: value, observeAtFirstLaunch: false,
});

export {
  Observable,
  observableOf,
};

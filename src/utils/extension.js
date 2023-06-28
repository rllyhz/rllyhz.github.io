import logger from "./logger";

class SingleObservable {
  #observer = null;

  constructor({ initialValue = null }) {
    this.currentValue = initialValue;
    this.#observer = null;
    this.isReleased = false;
  }

  observe(observer) {
    if (typeof observer !== "function") {
      logger.error("Observer must be a function");
      return;
    }

    if (this.#observer !== null) {
      logger.warn("Observer already existed on single observable. Could not set observer.");
      return;
    }

    this.#observer = observer;
  }

  emit(newValue) {
    if (this.isReleased) return this;

    this.currentValue = newValue;
    this.#observer(newValue);

    return this;
  }

  release() {
    this.isReleased = true;
    this.currentValue = null;
    this.#observer = null;
  }
}

class Observable {
  #observers = [];

  constructor({ observeAtFirstLaunch = false, initialValue = null }) {
    this.currentValue = initialValue;
    this.observeAtFirstLaunch = observeAtFirstLaunch;
    this.isReleased = false;
  }

  observe(observer) {
    if (typeof observer !== "function") {
      logger.error("Observer must be a function");
      return;
    }

    this.#observers.push(observer);

    if (this.observeAtFirstLaunch) {
      this.#observers[this.#observers.length - 1](this.value);
    }
  }

  emit(newValue) {
    if (this.isReleased) return this;

    this.currentValue = newValue;

    this.#observers.forEach((obsvr) => {
      if (!this.isReleased) obsvr(newValue);
    });

    return this;
  }

  release() {
    this.isReleased = true;
    this.currentValue = null;
    this.#observers.length = 0;
  }
}

const observableOf = (value = null) => new Observable({
  initialValue: value, observeAtFirstLaunch: false,
});

const singleObservableOf = (value = null) => new SingleObservable({ initialValue: value });

export {
  Observable,
  SingleObservable,
  singleObservableOf,
  observableOf,
};

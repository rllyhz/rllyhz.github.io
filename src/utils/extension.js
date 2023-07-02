import logger from "./logger";

class Observable {
  #observers = [];

  #currentValue = null;

  #observeAtFirstLaunch = false;

  constructor({ observeAtFirstLaunch = false, initialValue = null }) {
    this.#currentValue = initialValue;
    this.#observeAtFirstLaunch = observeAtFirstLaunch;
    this.isReleased = false;
  }

  observe(observer) {
    if (typeof observer !== "function") {
      logger.error("Observer must be a function");
      return;
    }

    this.#observers.push(observer);

    if (this.#observeAtFirstLaunch) {
      this.#observers[this.#observers.length - 1](this.value);
    }
  }

  emit(newValue) {
    if (this.isReleased) return this;

    this.#currentValue = newValue;

    this.#observers.forEach((obsvr) => {
      if (!this.isReleased) obsvr(newValue);
    });

    return this;
  }

  getCurrentValue() { return this.#currentValue; }

  release() {
    this.isReleased = true;
    this.#currentValue = null;
    this.#observers.length = 0;
  }
}

class SingleObservable {
  #observer = null;

  #currentValue = null;

  constructor({ initialValue = null }) {
    this.#currentValue = initialValue;
    this.#observer = null;
    this.isReleased = false;
  }

  observe(observer) {
    if (typeof observer !== "function") {
      logger.error("Observer must be a function");
      return;
    }

    if (this.#observer !== null) {
      logger.warn("Observer already existed on SingleObservable. Could not set new observer.");
      return;
    }

    this.#observer = observer;
  }

  emit(newValue) {
    if (this.isReleased) return this;

    this.#currentValue = newValue;
    this.#observer(newValue);

    return this;
  }

  getCurrentValue() { return this.#currentValue; }

  release() {
    this.isReleased = true;
    this.#currentValue = null;
    this.#observer = null;
  }
}

class PrivateObservable {
  #observers = [];

  #currentValue = null;

  #observeAtFirstLaunch = false;

  #publisher = "";

  constructor({ publisher = "", observeAtFirstLaunch = false, initialValue = null }) {
    this.#publisher = publisher;
    this.#currentValue = initialValue;
    this.#observeAtFirstLaunch = observeAtFirstLaunch;
    this.isReleased = false;
  }

  observe(observer) {
    if (typeof observer !== "function") {
      logger.error("Observer must be a function");
      return;
    }

    this.#observers.push(observer);

    if (this.#observeAtFirstLaunch) {
      this.#observers[this.#observers.length - 1](this.value);
    }
  }

  emit(publisher, newValue) {
    if (this.#publisher !== publisher) {
      logger.error("Emitting new value is not allowed. Publisher unknown!");
      return this;
    }

    if (this.isReleased) return this;

    this.#currentValue = newValue;

    this.#observers.forEach((obsvr) => {
      if (!this.isReleased) obsvr(newValue);
    });

    return this;
  }

  getCurrentValue() { return this.#currentValue; }

  release() {
    this.isReleased = true;
    this.#currentValue = null;
    this.#observers.length = 0;
  }
}

const observableOf = (value = null) => new Observable({
  initialValue: value, observeAtFirstLaunch: false,
});

const singleObservableOf = (value = null) => new SingleObservable({ initialValue: value });

const privateObservableOf = (publisher, value = null) => new PrivateObservable({
  publisher, initialValue: value,
});

export {
  Observable,
  SingleObservable,
  PrivateObservable,
  observableOf,
  singleObservableOf,
  privateObservableOf,
};

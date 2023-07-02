import { PrivateObservable } from "./extension";

const _Params = {
  observable: PrivateObservable,
};

const EventState = {
  ERROR: -1,
  LOADING: 0,
  HAS_DATA: 1,
};

class EventData {
  constructor(state, result = { data: null, error: null }) {
    this.state = state;
    this.result = result;
  }
}

class EventResult {
  /**
   * EventResult
   * @param {PrivateObservable} stream
   * @param {Function} retry
   */
  constructor(stream, retry = null) {
    this.stream = stream;
    this.retry = retry;
  }
}

export {
  _Params,
  EventState,
  EventData,
  EventResult,
};

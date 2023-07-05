import { EventData, EventResult, EventState } from "../../utils/event-helpers";
import { privateObservableOf } from "../../utils/extension";
import { getConfiguration } from "../process/dashboard";

const publisher = "dashboard_owner";

const getConfigurationController = (token) => {
  const resolver = privateObservableOf(publisher, new EventData(EventState.LOADING));

  const handler = () => {
    getConfiguration({
      token,
      onFailed: (status, error) => {
        resolver.emit(publisher, new EventData(EventState.ERROR, { error: { status, error } }));
      },
      onSuccess: (data) => {
        resolver.emit(publisher, new EventData(EventState.HAS_DATA, { data }));
      },
    });
  };

  handler();

  return new EventResult(resolver, handler);
};

export {
  getConfigurationController,
};

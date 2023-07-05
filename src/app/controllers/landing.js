import { EventData, EventResult, EventState } from "../../utils/event-helpers";
import { privateObservableOf } from "../../utils/extension";
import { getPinnedProjects } from "../process/landing";

const publisher = "landing_page";

const getAllPinnedProjectsController = () => {
  const resolver = privateObservableOf(publisher, new EventData(EventState.LOADING));

  const handler = () => {
    getPinnedProjects({
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
  getAllPinnedProjectsController,
};

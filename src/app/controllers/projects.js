import { EventData, EventResult, EventState } from "../../utils/event-helpers";
import { privateObservableOf } from "../../utils/extension";
import { getAllProjects, getProjectById } from "../process/projects";

const publisher = "projects_owner";

const getProjectsController = () => {
  const resolver = privateObservableOf(publisher, new EventData(EventState.LOADING));

  const handler = () => {
    getAllProjects({
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

const getProjectByIdController = (id) => {
  const resolver = privateObservableOf(publisher, new EventData(EventState.LOADING));

  const handler = () => {
    getProjectById({
      id,
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
  getProjectsController,
  getProjectByIdController,
};

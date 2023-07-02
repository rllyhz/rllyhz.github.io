import { APIUrl } from "../../globals/consts";
import { Api } from "../core/Api";

const getAllProjects = ({ onSuccess, onFailed }) => {
  Api.get(APIUrl.getProjects)
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

const getProjectById = ({ id, onSuccess, onFailed }) => {
  Api.get(APIUrl.getProjectById(id))
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

export {
  getAllProjects,
  getProjectById,
};

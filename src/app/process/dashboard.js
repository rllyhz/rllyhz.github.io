import { APIUrl } from "../../globals/consts";
import { Api, createBearerToken } from "../core/Api";

const logout = ({ token, onSuccess, onFailed }) => {
  const headers = new Headers({
    Authorization: createBearerToken(token),
  });

  Api.delete(APIUrl.logout, null, headers)
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

const getConfiguration = ({ token, onSuccess, onFailed }) => {
  const headers = new Headers({
    Authorization: createBearerToken(token),
    "Content-Type": "application/x-www-form-urlencoded",
  });

  Api.get(APIUrl.getConfiguration, null, headers)
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

const importProjects = ({
  token, data, onSuccess, onFailed,
}) => {
  const headers = new Headers({
    Authorization: createBearerToken(token),
    "Content-Type": "application/json",
  });

  Api.post(APIUrl.importProjects, JSON.stringify(data), headers)
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

export {
  logout,
  getConfiguration,
  importProjects,
};

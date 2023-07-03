import { APIUrl } from "../../globals/consts";
import { Api } from "../core/Api";

const getConfiguration = ({ token, onSuccess, onFailed }) => {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  });

  Api.get(APIUrl.getConfiguration, null, headers)
    .onSuccess(onSuccess)
    .onFailed(onFailed)
    .execute();
};

export {
  getConfiguration,
};

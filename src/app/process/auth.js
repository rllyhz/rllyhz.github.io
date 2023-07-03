import { Config } from "../../globals/config";
import { APIUrl } from "../../globals/consts";
import { ApiFetch } from "../core/Api";

const login = async ({
  onSuccess, onFailed,
  body = { username: "", password: "" },
}) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const baseUrl = Config.Mode.Production ? APIUrl.baseUrl : APIUrl.baseUrlTesting;
  const loginEndpointUrl = `${baseUrl}${APIUrl.login}`;

  const { success, responseData } = await ApiFetch.post(
    loginEndpointUrl,
    JSON.stringify(body),
    headers,
  );

  if (success) {
    onSuccess(responseData);
  } else {
    onFailed(responseData.status, responseData.error);
  }
};

export {
  login,
};

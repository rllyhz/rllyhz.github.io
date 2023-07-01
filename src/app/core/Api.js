import { Config } from "../../globals/config";
import { API } from "../../globals/consts";
import { sanitizePath } from "../../utils/route-helper";

class ApiBuilder {
  constructor(
    endpointUrl = "/",
    method = "GET",
    body = null,
    headers = undefined,
  ) {
    if (Config.Mode.Production) {
      this.endpointUrl = `${API.baseUrl}/${sanitizePath(endpointUrl)}`;
    } else {
      this.endpointUrl = `${API.baseUrlTesting}/${sanitizePath(endpointUrl)}`;
    }

    this.method = method;
    this.body = body;
    this.headers = headers;

    this.onSuccessCallback = null;
    this.onFailedCallback = null;
  }

  onFailed(callback) {
    this.onFailedCallback = callback;
    return this;
  }

  onSuccess(callback) {
    this.onSuccessCallback = callback;
    return this;
  }

  execute() {
    fetch(this.endpointUrl, {
      method: this.method,
      body: this.body,
      headers: this.headers,
    }).catch((err) => {
      this.onFailedCallback(408, err);
    }).then(
      (res) => {
        if (res.ok && res.status === 200) {
          this.onSuccessCallback(res.json());
        } else {
          this.onFailedCallback(res.status, "Error");
        }
      },
    );
  }
}

const Api = {
  get: (endpointUrl, body, headers = undefined) => ApiBuilder(
    endpointUrl,
    "GET",
    body,
    headers,
  ),
  post: (endpointUrl, body, headers = undefined) => ApiBuilder(
    endpointUrl,
    "POST",
    body,
    headers,
  ),
  put: (endpointUrl, body, headers = undefined) => ApiBuilder(
    endpointUrl,
    "PUT",
    body,
    headers,
  ),
  patch: (endpointUrl, body, headers = undefined) => ApiBuilder(
    endpointUrl,
    "PATCH",
    body,
    headers,
  ),
  delete: (endpointUrl, body = null, headers = undefined) => ApiBuilder(
    endpointUrl,
    "DELETE",
    body,
    headers,
  ),

  // helpers
  createBearerToken: (token) => `Bearer ${token}`,
};

export default Api;

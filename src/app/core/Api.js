import { Config } from "../../globals/config";
import { APIUrl, StatusCode } from "../../globals/consts";
import logger from "../../utils/logger";
import { sanitizePath } from "../../utils/route-helper";

class ApiBuilder {
  #onSuccessCallback = null;

  #onFailedCallback = null;

  #endpointUrl = null;

  #method = null;

  #body = null;

  #headers = null;

  constructor(
    endpointUrl = "/",
    method = "GET",
    body = null,
    headers = undefined,
  ) {
    if (Config.Mode.Production) {
      this.#endpointUrl = `${APIUrl.baseUrl}/${sanitizePath(endpointUrl)}`;
    } else {
      this.#endpointUrl = `${APIUrl.baseUrlTesting}/${sanitizePath(endpointUrl)}`;
    }

    this.#method = method;
    this.#body = body;
    this.#headers = headers;

    this.#onSuccessCallback = null;
    this.#onFailedCallback = null;
  }

  onFailed(callback) {
    this.#onFailedCallback = callback;
    return this;
  }

  onSuccess(callback) {
    this.#onSuccessCallback = callback;
    return this;
  }

  execute() {
    logger.info(`[API Call] \n${this.#method}: ${this.#endpointUrl}`);

    fetch(this.#endpointUrl, {
      method: this.#method,
      body: this.#body,
      headers: this.#headers,
    }).catch((error) => {
      logger.error(`[API Call Error] \n${this.#method}: ${this.#endpointUrl}`);
      return { error };
    }).then(
      async (res) => {
        if (res.error) {
          this.#onFailedCallback(StatusCode.TimeOut, res.error);
          return;
        }

        const data = await res.json();

        if (res.ok && res.status === 200) {
          if (this.#onSuccessCallback && typeof this.#onSuccessCallback === "function") {
            this.#onSuccessCallback(data);
          }
          return;
        }

        if (this.#onFailedCallback && typeof this.#onFailedCallback === "function") {
          this.#onFailedCallback(res.status, data);
        }
      },
    );
  }
}

const Api = {
  get: (endpointUrl, body = null, headers = undefined) => new ApiBuilder(
    endpointUrl,
    "GET",
    body,
    headers,
  ),
  post: (endpointUrl, body, headers = undefined) => new ApiBuilder(
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
  patch: (endpointUrl, body, headers = undefined) => new ApiBuilder(
    endpointUrl,
    "PATCH",
    body,
    headers,
  ),
  delete: (endpointUrl, body = null, headers = undefined) => new ApiBuilder(
    endpointUrl,
    "DELETE",
    body,
    headers,
  ),
};

const FetchHandler = async (endpointUrl, method, body, headers) => {
  try {
    logger.info(`[API Call] \n${method}: ${endpointUrl}`);

    const response = await fetch(endpointUrl, { method, body, headers });
    const data = await response.json();

    if (response.ok && response.status === 200) {
      return {
        success: true,
        responseData: data,
      };
    }
    return {
      success: false,
      responseData: { status: response.status, error: data },
    };
  } catch (error) {
    logger.error(`[API Call Error] \n${method}: ${endpointUrl}`);
    return {
      success: false,
      responseData: { status: StatusCode.TimeOut, error },
    };
  }
};

const ApiFetch = {
  get: async (endpointUrl, body = null, headers = undefined) => FetchHandler(endpointUrl, "GET", body, headers),
  post: async (endpointUrl, body, headers = undefined) => FetchHandler(endpointUrl, "POST", body, headers),
  put: async (endpointUrl, body, headers = undefined) => FetchHandler(endpointUrl, "PUT", body, headers),
  patch: async (endpointUrl, body, headers = undefined) => FetchHandler(endpointUrl, "PATCH", body, headers),
  delete: async (endpointUrl, body = null, headers = undefined) => FetchHandler(endpointUrl, "DELETE", body, headers),
};

// helpers
const createBearerToken = (token) => `Bearer ${token}`;

export {
  Api,
  ApiFetch,
  createBearerToken,
};

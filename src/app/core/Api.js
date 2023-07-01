import { Config } from "../../globals/config";
import { API } from "../../globals/consts";
import logger from "../../utils/logger";
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
    logger.info(`${this.method}: ${this.endpointUrl}`);

    fetch(this.endpointUrl, {
      method: this.method,
      body: this.body,
      headers: this.headers,
    }).catch((err) => {
      logger.error(`${this.method}: ${this.endpointUrl}`);
      this.onFailedCallback(408, err);
    }).then(
      async (res) => {
        if (res.ok && res.status === 200) {
          const data = await res.json();
          this.onSuccessCallback(data);
        } else {
          this.onFailedCallback(res.status, "Error");
        }
      },
    );
  }
}

const Api2 = {
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
    const response = await fetch(endpointUrl, { method, body, headers });

    if (response.ok && response.status === 200) {
      const data = await response.json();
      return {
        success: true,
        responseData: data,
      };
    }
    return {
      success: false,
      responseData: { status: response.status, error: "Error" },
    };
  } catch (error) {
    return {
      success: false,
      responseData: { status: 408, error },
    };
  }
};

const Api = {
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
  Api2,
  createBearerToken,
};

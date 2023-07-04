import logger from "../../utils/logger";
import { toPath } from "../../utils/route-helper";
import Routes from "./Routes";

const Route = {
  path: "",
  cb: () => {},
};

/**
 * Router
 * @param {Route[]} routes
 * @returns {this} router
 */
const Router = (routes = []) => {
  // always redirect to "#/" hash url for the first time
  if (location.hash === "") {
    location.href = toPath("/");
    return {
      setNotFoundCallback: () => {},
      setBeforeEach: () => {},
      setAfterEach: () => {},
      init: () => {},
    };
  }

  const appRoutes = routes || [];

  /**
   * @type {Function}
   */
  let notFoundCallback = null;

  /**
   * @type {Function}
   */
  let beforeEachCallback = null;

  /**
   * @type {Function}
   */
  let afterEachCallback = null;

  // url hash
  const { hash } = window.location;

  // Remove the "#" symbol from the hash
  const tempHash = hash.trim().slice(1);
  let trimmedHash = tempHash;

  const queryString = trimmedHash.split("?")[1];

  // if query params exists
  // override hash with no query params
  if (queryString) {
    const hashWithoutQueryParams = trimmedHash.split("?")[0];
    trimmedHash = hashWithoutQueryParams;
  }

  // sanitize path to alwasy dont have "/" at the end
  // except for specific route "/" itself
  if (trimmedHash.slice(-1) === "/" && trimmedHash.length !== 1) {
    trimmedHash = trimmedHash.slice(0, trimmedHash.length - 1);
  }

  /**
   * @param {Function} cb
   */
  const setNotFoundCallback = (cb) => {
    notFoundCallback = cb;
  };

  /**
   * @param {Function} cb
   */
  const setBeforeEach = (cb) => {
    beforeEachCallback = cb;
  };

  /**
   * Set callback after each route getting invoked
   * @param {Function} cb
   */
  const setAfterEach = (cb) => {
    afterEachCallback = cb;
  };

  /**
   * Initialize new Router
   * @param {Function} cb
   */
  const init = () => {
    // If no route specified, return a default page
    if (appRoutes.length <= 0) {
      logger.error("Route not found");
      if (notFoundCallback && typeof notFoundCallback === "function") notFoundCallback();
      return;
    }

    // Find the matching route for the given hash
    const matchedRoute = appRoutes.find((route) => {
      Route.path = route.path || "";
      Route.cb = route.cb || null;

      // make new rule for route "*" to give the client alternative way
      // to trigger the default route
      if (Route.path === Routes.specialPathForDefaultCallback) {
        return true;
      }

      // SOLVED: This seems not pass when path something like "project-jnsvjk-sd55-ddf-38kn"
      // from : `^${Route.path.replace(/:\w+/g, "(\\w+)")}$`
      // to   : `^${Route.path.replace(/:[^\s/]+/g, "([^/]+)")}$`
      const regex = new RegExp(`^${Route.path.replace(/:[^\s/]+/g, "([^/]+)")}$`);
      return trimmedHash.match(regex);
    });

    // If no route is matched, return a default page
    if (!matchedRoute) {
      logger.error("Route not found");
      if (notFoundCallback && typeof notFoundCallback === "function") notFoundCallback();
      return;
    }

    logger.log("Route found");

    // Extract dynamic parameters from the hash
    const params = {};

    if (matchedRoute.path !== "*") {
      const regex = new RegExp(`^${matchedRoute.path.replace(/:[^\s/]+/g, "([^/]+)")}$`);
      const paramValues = trimmedHash.match(regex).slice(1);

      const dynamicsParamKeys = matchedRoute.path.match(/:[^\s/]+/g);

      if (dynamicsParamKeys !== null) {
        const paramKeyValuePairs = dynamicsParamKeys.map((paramKey) => paramKey.slice(1));
        paramKeyValuePairs.forEach((paramName, index) => {
          params[paramName] = paramValues[index];
        });
      }
    }

    // Extract query params if any
    // Parse the query string into key-value pairs
    const query = {};
    if (queryString) {
      queryString.split("&").forEach((param) => {
        const [key, value] = param.split("=");
        query[key] = decodeURI(value || "");
      });
    }

    // run route callback
    if (!Route.cb || typeof Route.cb !== "function") {
      logger.error(`Could not invoke the callback for route "${Route.path}"!`);
      return;
    }

    // invoke before callback
    if (beforeEachCallback && typeof beforeEachCallback === "function") {
      beforeEachCallback();
    }

    const data = { params, query };
    Route.cb(data);
    logger.log("Route's callback invoked");

    // invoke after callback
    if (afterEachCallback && typeof afterEachCallback === "function") {
      afterEachCallback();
    }
  };

  return {
    /**
     * Set Not found callback
     * @param {Function} cb
     */
    setNotFoundCallback,

    /**
     * Set callback before each route getting invoked
     * @param {Function} cb
     */
    setBeforeEach,

    /**
     * Set callback after each route getting invoked
     * @param {Function} cb
     */
    setAfterEach,

    /**
     * Initialize new Router
     */
    init,
  };
};

Router.navigateTo = (path) => {
  location.href = toPath(path);
};

Router.navigateUp = () => {
  history.back();
};

Router.refresh = () => {
  location.reload();
};

export default Router;

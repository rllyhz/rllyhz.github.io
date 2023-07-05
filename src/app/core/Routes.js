import { sanitizePath } from "../../utils/route-helper";

const Routes = {
  specialPathForDefaultCallback: "*",
  /**
   * Create new Route
   * @param {String} path - Route path
   * @param {Function} cb - Callback
   * @returns {{ path: String, cb: Function }}
   */
  create: (path, cb) => ({
    path: path === "*" ? path : `/${sanitizePath(String(path || "/"))}`,
    cb,
  }),
};

export default Routes;

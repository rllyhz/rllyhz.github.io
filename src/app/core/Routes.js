import { sanitizePath } from "../../utils/route-helper";

const Routes = {
  create: (path, cb) => ({
    path: `/${sanitizePath(path)}`,
    cb,
  }),
};

export default Routes;

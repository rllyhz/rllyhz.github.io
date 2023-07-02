const history = [];
let _data = null;

// const _urlHashed = "/#/";

const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split("/");
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : "/")
    + (splitedUrl.id ? "/:id" : "")
    + (splitedUrl.verb ? `/${splitedUrl.verb}` : "");
  },
};

const Router = {
  getPathData: () => _data,
  resolveActivePath: () => UrlParser.parseActiveUrlWithCombiner(),
  getId: () => UrlParser.parseActiveUrlWithoutCombiner().id,

  getExpectedRoute() {
    const data = this.getId();
    const activePath = this.resolveActivePath();

    return { data, activePath };
  },

  navigateTo(path, data = null) {
    history.unshift(path);
    _data = data;
    location.href = path;
  },

  navigateUp() {
    const path = history.shift();
    location.hash = path;
  },

  href(url = "/") {
    location.href = url;
  },

  path() {
    return location.hash;
  },
};

export default Router;

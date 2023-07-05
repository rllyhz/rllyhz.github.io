const isArray = (value, shouldNotEmpty = false) => {
  if (shouldNotEmpty) return Array.isArray(value) && value.length > 0;
  return Array.isArray(value);
};
const isObject = (value) => typeof value === "object" && value !== null;
const hasKey = (value = {}, key = "") => isObject(value) && value[key];

const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

/**
* Resolve Project Model format
* @param {ProjectModel} project
* @return {boolean} **valid**
*/
const resolveProjectFormat = (project) => {
  if (!isObject(project)) return false;

  if (!hasKey(project, "title") || !project.title) return false;
  if (!hasKey(project, "description") || !project.description) return false;
  if (!hasKey(project, "imagePath") || !project.imagePath) return false;
  if (!hasKey(project, "type") || !project.type) return false;
  if (!hasKey(project, "url") || !project.url) return false;

  if (!hasKey(project, "languages") || !project.languages) return false;
  if (!hasKey(project, "technologies") || !project.technologies) return false;

  return true;
};

/**
* Resolve Project Model format
* @description Returns **false** when list data not valid or empty
* @param {ProjectModel[]} projects
* @return {boolean} **valid**
*/
const resolveListProjectsFormat = (projects) => {
  if (!isArray(projects, true)) return false;
  return projects.every((project) => resolveProjectFormat(project));
};

export {
  isArray,
  isObject,
  hasKey,
  resolveProjectFormat,
  resolveListProjectsFormat,
  validateEmail,
};

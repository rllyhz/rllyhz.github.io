import ProjectModel from "../../app/model/ProjectModel";
import { toPath } from "../route-helper";

const Params = {
  project: ProjectModel,
};

const dummyAuthor = "dummy-user";

const dummyProject = new ProjectModel(
  "Project title",
  dummyAuthor,
  "Project description",
  "image-path",
  "project-type",
  toPath("/"),
  ["JS"],
  ["Web"],
);

/**
  * Get Dummy Project
  * @returns {ProjectModel} project
  */
const getDummyProject = () => dummyProject;

/**
  * Get Dummy Projects
  * @param {number} total
  * @param {String} author
  * @returns {ProjectModel[]} projects
  */
const createDummyProjects = (total = 1, author = dummyAuthor) => {
  if (total <= 0) return [];
  if (total === 1) return [dummyProject];

  const tempProjects = [];

  for (let index = 1; index <= total; index++) {
    tempProjects.push(
      new ProjectModel(
        `Project title ${index}`,
        author,
        `Project description ${index}`,
        `image-path-${index}`,
        `project-type-${index}`,
        toPath("/"),
        ["JS"],
        ["Web"],
      ),
    );
  }

  return tempProjects;
};

/**
  * Get Preview Empty Projects
  * @param {number} total
  * @param {String} author
  * @returns {ProjectModel[]} projects
  */
const createPreviewEmptyProjects = (total = 1, author = "rllyhz") => {
  if (total <= 0) return [];
  if (total === 1) return [dummyProject];

  const tempProjects = [];

  for (let index = 1; index <= total; index++) {
    tempProjects.push(
      new ProjectModel(
        "No Title",
        author,
        `Project description ${index}`,
        `image-path-${index}`,
        `project-type-${index}`,
        toPath("/"),
        ["JS"],
        ["Web"],
      ),
    );
  }

  return tempProjects;
};

export {
  Params,
  getDummyProject,
  createDummyProjects,
  createPreviewEmptyProjects,
};

export default class ProjectModel {
  title;

  author;

  description;

  imagePath;

  type;

  url;

  languages = [];

  technologies = [];

  constructor(
    title,
    author,
    description,
    imagePath,
    type,
    url,
    languages = [],
    technologies = [],
  ) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.imagePath = imagePath;
    this.type = type;
    this.url = url;
    this.languages = languages;
    this.technologies = technologies;
  }
}

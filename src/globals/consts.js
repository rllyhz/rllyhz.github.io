const API = {
  baseUrl: "https://rllyzhz-github-pages.netlify.app/.netlify/functions/api",
  baseUrlTesting: "http://localhost:9000/.netlify/functions/api",
  login: "/auth/login",
  logout: "/auth/logout",
  getPinnedProjects: "/pinned-projects",
  getProjects: "/projects",
  getProjectById: (id) => `/projects/${id}`,
  createNewProject: "/projects",
  updateProjectById: (id) => `/projects/${id}`,
  deleteProjectById: (id) => `/projects/${id}`,
  getConfiguration: "/configuration",
  updateConfiguration: "/configuration",
  importProjects: "/data/projects/import",
  exportProjects: "/data/projects/export",
};

const Social = {
  email: "rullyihza00@gmail.com",
  linkedIn: "https://www.linkedin.com/in/rully-ihza-mahendra/",
  github: "https://github.com/rllyhz/",
  stackOverflow: "https://stackoverflow.com/users/17045891/rllyhz",
  facebook: "https://www.facebook.com/rully.ihza",
  instagram: "https://www.instagram.com/rllyhz/",
  twitter: "https://twitter.com/rllyhz",
};

const Links = {
  googleCertified: "https://www.credential.net/e948eae5-beb6-4d40-b4ea-f026bb6b89e2?key=d12f12ed014711d9a40e0e19866d469462b690cfbcd597dbfda4048ff4cad91d&record_view=true",
  bangkit: "https://grow.google/intl/id_id/bangkit/",
};

const Data = {
  Languages: [
    "HTML", "CSS", "JavaScript", "TypeScript", "Java",
    "Kotlin", "Swift", "Dart", "Python", "PHP", "C",
    "C++", "C#", "Golang", "Ruby", "R", "XML",
    "SQL",
  ],
  Technologies: [
    "Web", "Android", "Desktop", "Multi-Platform", "Flutter",
    "Automation", "AI", "Machine Learning", "IoT",
  ],
  ProjectTypes: [
    {
      type: "web",
      name: "WebApp",
    },
    {
      type: "android",
      name: "Android App",
    },
    {
      type: "multiplatform-app",
      name: "Multi-Platform App",
    },
    {
      type: "desktop",
      name: "Desktop",
    },
    {
      type: "api",
      name: "API",
    },
    {
      type: "scripting",
      name: "Scripting",
    },
  ],
};

export {
  API,
  Social,
  Links,
  Data,
};

import { StringResource } from "./config";

const APIUrl = {
  baseUrl: "https://rllyzhz-github-pages.netlify.app/.netlify/functions/api",
  baseUrlTesting: "http://localhost:9000/.netlify/functions/api",
  getIPDetailClient: "https://ipapi.co/json/",
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
  contactMessages: "/sheets/messages",
  emails: "/sheets/emails",
};

const StatusCode = {
  // CLIENT
  BadRequest: 400,
  NotAllowed: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  TimeOut: 408,
  // SERVER
  InternalServerError: 500,
  NotImplemented: 501,
};

const Strings = StringResource;

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
      icon: "🌐",
    },
    {
      type: "android",
      name: "Android App",
      icon: "📱",
    },
    {
      type: "ios",
      name: "iOS App",
      icon: "📱",
    },
    {
      type: "multiplatform-app",
      name: "Multi-Platform App",
      icon: "📱💻",
    },
    {
      type: "desktop",
      name: "Desktop",
      icon: "💻",
    },
    {
      type: "api",
      name: "API",
      icon: "🤖",
    },
    {
      type: "scripting",
      name: "Scripting",
      icon: "📃",
    },
  ],
};

export {
  APIUrl,
  StatusCode,
  Strings,
  Social,
  Links,
  Data,
};

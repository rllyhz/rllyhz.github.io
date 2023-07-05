const Config = {
  Mode: {
    Production: true,
  },
  CACHE_NAME: "RllyhzGithubPages-V2",
  STORAGE_AUTH_KEY: "RllyhzGithubPages-V2",
};

const StringResource = {
  App: {
    Title: "Rllyhz's Github Pages",
    Author: "Rully Ihza Mahendra",
    Description: "Rully Ihza Mahendra's Page | I am a Software Enthusiast and Github contributor based in Semarang, Indonesia.",
    Keywords: "Rully Ihza Mahendra, rllyhz, @rllyhz, Web Developer, Android Developer, Web Design, Software Enthusiast, Github contributor, GitHub, GitHub Pages",
    Links: [
      "https://rllyhz.github.io",
      "https://rllyhz.github.io/#/",
      "https://rllyhz.github.io/#/login/",
      "https://rllyhz.github.io/#/dashboard/",
      "https://rllyhz.github.io/#/projects/",
    ],
  },
  Menus: {
    Home: "Home",
    About: "About",
    Skills: "Skills",
    Work: "Work",
    Contact: "Contact",
  },
  Pages: {
    Titles: {
      LandingPage: "Home Page",
      LoginPage: "Login Page",
      ProjectsPage: "Projects Page",
      ProjectDetailPage: "Project Detail Page",
      ProjectUpdatePage: "Project Update Page",
      DashboardPage: "Dashboard Page",
    },
  },
  Buttons: {
    ContactMe: "Contact Me",
    SeeMore: "See More",
    SendEmail: "Send",
    Retry: "Retry",
  },
  Placeholders: {
    FullName: "Fullname (required)",
    Email: "Email (required)",
    Message: "Your Message (required)",
  },
  Alerts: {
    ConnectionTimeOut: {
      Title: "❌ Oopss...",
      Message: "Failed to connect. Please check your connection",
      ConfirmText: "Oke",
    },
    BadRequest: {
      Title: "❌ Oopss...",
      Message: "Bad request",
      ConfirmText: "Oke",
    },
    SomethingWentWrong: {
      Title: "❌ Oopss...",
      Message: "Something went wrong unexpectedly",
      ConfirmText: "Oke",
    },
    LoginFailed: {
      Title: "❌ Oopss...",
      Message: "Failed to login!",
      ConfirmText: "Oke",
    },
    LoginSuccess: {
      Title: "✅ Success",
      Message: "Successfully logged in!",
      ConfirmText: "Oke",
    },
    Authenticated: {
      Title: "Hey 👋",
      Message: "You already logged in!",
      ConfirmText: "Oke",
    },
    Unauthenticated: {
      Title: "Hey 👋",
      Message: "You're not allowed to access this page!",
      ConfirmText: "Oke",
    },
    FailedToFetchData: {
      Title: "❌ Oopss...",
      Message: "Failed to load data!",
      ConfirmText: "Oke",
    },
    ProjectDetailNotFound: {
      Title: "❌ Not Allowed",
      Message: "Project not found!",
      ConfirmText: "Oke",
    },
    CurrentlyNoProjects: {
      Title: "Sorry ☹️",
      Message: "Currently no projects to show!",
      ConfirmText: "Oke",
    },
    FillOutAllTheRequiredFields: {
      Title: "Not Allowed",
      Message: "Please fill in all the required fields!",
      ConfirmText: "Oke",
    },
    InvalidEmailFormat: {
      Title: "Not Allowed",
      Message: "Please enter a valid email!",
      ConfirmText: "Oke",
    },
    FailedToSendEmail: {
      Title: "Oppss...",
      Message: "Failed to send email! 😕",
      ConfirmText: "Oke",
    },
    SuccessfullySentEmail: {
      Title: "Email successfully sent 💌",
      Message: "Thank you for contacting me.",
      ConfirmText: "Oke",
    },
    UploadFilesFirst: {
      Title: "Hey 🕵️",
      Message: "Upload a file first",
      ConfirmText: "Oke",
    },
    MustUploadJsonFile: {
      Title: "Hey 🕵️",
      Message: "Please upload a json file",
      ConfirmText: "Oke",
    },
    MustUploadZipFile: {
      Title: "Hey 🕵️",
      Message: "Please upload a zip file",
      ConfirmText: "Oke",
    },
    InvalidFormatOfProjectsFile: {
      Title: "Hey 🕵️",
      Message: "Projects file you uploaded is invalid",
      ConfirmText: "Oke",
    },
    InvalidFormatOfProjectImagesZipFile: {
      Title: "Hey 🕵️",
      Message: "Project images zip file you uploaded is invalid",
      ConfirmText: "Oke",
    },
    FailedToImportProjects: {
      Title: "❌ Oopss...",
      Message: "Failed to import projects!",
      ConfirmText: "Oke",
    },
    SuccessfullyImportedProjects: {
      Title: "✅ Success",
      Message: "Successfully imported projects!",
      ConfirmText: "Oke",
    },
  },
  NotFoundTemplate: {
    Title: "404 - Not Found",
    Message: "Opss... There is nothing here",
    ButtonText: "Back Home",
  },
  ThankYou: "Thank You",
  GetConnectionWithMe: "Get connection with me",
  BuiltCopyright: (loveIconTag) => `Built with ${loveIconTag} by Rully Ihza Mahendra`,
  Copyright: (year) => `© ${year} copyright all right reserved`,
};

export {
  Config,
  StringResource,
};

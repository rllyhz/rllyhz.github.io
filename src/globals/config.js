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
    FailedToFetchData: {
      Title: "❌ Oopss...",
      Message: "Failed to load data!",
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

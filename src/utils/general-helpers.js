function getFirstName(fullname = "") {
  return fullname.split(" ")[0];
}

const createGreetingUserTemplate = (name) => {
  const today = new Date();
  const currHours = today.getHours();
  let gretting;

  if (currHours < 12) {
    gretting = "Good Morning";
  } else if (currHours < 18) {
    gretting = "Good Afternoon";
  } else {
    gretting = "Good Evening";
  }
  return `${gretting}, ${getFirstName(name)}! 👋`;
};

const camelCaseToCapitalize = (text = "") => {
  const result = String(text).replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export {
  getFirstName,
  createGreetingUserTemplate,
  camelCaseToCapitalize,
};

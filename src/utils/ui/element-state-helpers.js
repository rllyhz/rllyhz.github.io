import logger from "../logger";

let tempNodeText = null;
let tempNodeDisplay = null;

const toggleShow = (node, showing = true) => {
  if (showing) {
    tempNodeDisplay = node.style.display;
    node.style.display = "none";
  } else {
    node.style.display = tempNodeDisplay;
  }
};

const toggleCustomButtonLoadingState = (button, loading = true) => {
  let customButton = null;
  if (button.shadowRoot.querySelector("button")) {
    customButton = button.shadowRoot.querySelector("button");
  } else if (button.shadowRoot.querySelector("a")) {
    customButton = button.shadowRoot.querySelector("a");
  } else {
    logger.error("'button' are not CustomButton!");
    return;
  }

  if (loading) {
    tempNodeText = customButton.innertText;
    customButton.innertText = "Loading...";
    customButton.setAttribute("disabled", "disabled");
  } else {
    customButton.removeAttribute("disabled");
    customButton.innertText = tempNodeText;
  }
};

export {
  toggleShow,
  toggleCustomButtonLoadingState,
};

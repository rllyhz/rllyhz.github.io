import logger from "./logger";

const swRegister = async () => {
  if (!("serviceWorker" in navigator)) {
    logger.error("Service Worker not supported in the browser");
    return;
  }

  try {
    await navigator.serviceWorker.register("./sw.bundle.js");
    logger.info("Service worker registered");
  } catch (error) {
    logger.error(`Failed to register service worker: ${error}`);
  }
};

export default swRegister;

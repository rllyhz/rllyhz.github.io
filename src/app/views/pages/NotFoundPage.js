import logger from "../../../utils/logger";
import NotFound from "../../components/NotFound";

export default class NotFoundPage {
  static async render() {
    const notFound = document.createElement(NotFound.tagName);
    document.body.appendChild(notFound);
    logger.info("Not Found Page rendered");
  }
}

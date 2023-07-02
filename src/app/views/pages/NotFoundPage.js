import { Strings } from "../../../globals/consts";
import logger from "../../../utils/logger";
import NotFound from "../../components/NotFound";
import Dom from "../../core/Dom";
import { Router } from "../../routes";

export default class NotFoundPage {
  static async render() {
    const notFound = Dom.createElement({
      tagName: NotFound.tagName,
      props: {
        title: Strings.NotFoundTemplate.Title,
        message: Strings.NotFoundTemplate.Message,
        "button-text": Strings.NotFoundTemplate.ButtonText,
      },
    });
    notFound.onButtonClick = () => {
      Router.navigateTo("/");
    };
    document.body.appendChild(notFound);
    logger.info("Not Found Page rendered");
  }
}

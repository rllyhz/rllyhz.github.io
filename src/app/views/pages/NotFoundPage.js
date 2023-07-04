import { Strings } from "../../../globals/consts";
import NotFound from "../../components/NotFound";
import Dom from "../../core/Dom";
import Router from "../../core/Router";

export default class NotFoundPage {
  static async render() {
    document.body.innerHTML = "";
    document.body.scrollTo({
      top: "0",
      behavior: "smooth",
    });

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
  }
}

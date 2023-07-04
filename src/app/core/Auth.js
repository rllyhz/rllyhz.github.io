import { Config } from "../../globals/config";
import Storage from "./Storage";
import AuthModel from "../model/AuthModel";

const Auth = {
  getAuthenticationData() {
    const data = Storage.getData(Config.STORAGE_AUTH_KEY);
    let isLoggedIn = false;
    let token = null;
    let tokenCreatedAt = null;

    if (data !== null) {
      isLoggedIn = data.isLoggedIn ?? false;
      token = data.token ?? false;
      tokenCreatedAt = data.tokenCreatedAt ?? false;
    }

    return new AuthModel(isLoggedIn, token, tokenCreatedAt);
  },

  updateAuthenticationData(isLoggedIn = false, token = null, tokenCreatedAt = null) {
    const data = new AuthModel(isLoggedIn, token, tokenCreatedAt);
    Storage.saveData(Config.STORAGE_AUTH_KEY, data);
  },

  flashAuthenticationData() {
    this.updateAuthenticationData(false);
  },

  authenticate() {
    const authenticationData = this.getAuthenticationData();
    return authenticationData.isLoggedIn;
  },
};

export default Auth;

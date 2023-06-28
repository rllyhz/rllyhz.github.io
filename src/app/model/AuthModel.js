export default class AuthModel {
  constructor(isLoggedIn = false, token = null, tokenCreatedAt = null) {
    this.isLoggedIn = isLoggedIn;
    this.token = token;
    this.tokenCreatedAt = tokenCreatedAt;
  }
}

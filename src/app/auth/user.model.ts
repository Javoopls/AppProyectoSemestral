export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private expiracionToken: Date
  ) {}

  get token() {
    if (!this.expiracionToken || this.expiracionToken <= new Date()) {
      return null;
    }
    return this._token;
  }

  get duracionToken() {
    if (!this.token) {
      return 0;
    }
    // return 2000;
    return this.expiracionToken.getTime() - new Date().getTime();
  }
}

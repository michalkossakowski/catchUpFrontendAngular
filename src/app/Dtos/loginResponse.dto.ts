export class loginResponse {
  accessToken: string;
  refreshToken: string;

  constructor(
    accessToken:string,
    refreshToken:string
  ){
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
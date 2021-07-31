import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessTokenValue: string;
  private tokenKey = 'AUTH-TKN';

  constructor() {
    this.accessTokenValue = sessionStorage.getItem(this.tokenKey);
  }

  get accessToken() {
    return this.accessTokenValue;
  }

  set accessToken(value: string) {
    if (!value) {
      sessionStorage.removeItem(this.tokenKey);
    } else {
      sessionStorage.setItem(this.tokenKey, value);
    }
    this.accessTokenValue = value;
  }

  public clearToken() {
    this.accessToken = null;
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap, delay, switchMap, catchError } from 'rxjs/operators';
import { of as observableOf,throwError as observableThrowError,Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiAuthUrl = `${environment.serverUrl}/auth`;

  private iss = `${this.apiAuthUrl}/login`;

  private tokenAlias = 'token';

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  handle(token: any){
    if (this.tokenIsValid(token.access_token)){
      this.storeToken(token.access_token);
      this.storeTokenExpire(token.expire);

      return true;
    } else {
      console.error('invalid token data');
    }

    return false;
  }

  storeToken(token: any){
    localStorage.removeItem(this.tokenAlias);
    localStorage.setItem(this.tokenAlias, token);
  }

  storeTokenExpire(expire: string){
    localStorage.setItem('token_expire', expire);
  }

  getToken(){
    return localStorage.getItem(this.tokenAlias);
  }

  removeToken(){
    localStorage.removeItem(this.tokenAlias);
  }

  tokenIsValid(authToken = null){
    let token = authToken != null ? authToken : this.getToken();

    if (token){
      let payload = this.getPayload(token);

      if (payload){
        if (environment.envName == 'DEV'){
          //console.log(Object.values(this.iss));
          //console.log(payload.iss, this.iss);
        }

        return this.iss == payload.iss ? true : false;
      } else {
        console.error('invalid iss!');
      }
    } else {
      console.error('invalid token!');
    }

    return false;
  }

  getPayload(token: any){
    let payload = token.split('.')[1];

    return JSON.parse(atob(payload));
  }

  refreshToken(): Observable<any>{
    return this.http.get(`${this.apiAuthUrl}/refresh`).pipe(tap((res: any) => {
      this.storeToken(res.access_token);
    }));
  }
}

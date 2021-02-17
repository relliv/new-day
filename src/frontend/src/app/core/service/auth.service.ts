import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  BehaviorSubject
} from 'rxjs/internal/BehaviorSubject';
import {
  TokenService
} from './token.service';
import {
  environment
} from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject < boolean > (this.tokenService.tokenIsValid());
  private authStatus = this.isLoggedIn.asObservable();
  private apiAuthUrl = `${environment.serverUrl}/auth`;
  private apiUserUrl = `${environment.serverUrl}/user`;

  changeAuthStatus(value: boolean) {
    this.isLoggedIn.next(value)
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  public authUser(formData: any, from: any) {
    return this.http.post(`${this.apiAuthUrl}/${from}`, formData);
  }

  public logout() {
    return this.http.get(`${this.apiAuthUrl}/logout`);
  }

  public storeUserInfo(userInfo: any) {
    localStorage.setItem('user', JSON.stringify(userInfo));
  }

  public getUserInfo() {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }

  public removeUserInfo() {
    localStorage.removeItem('user');
  }
}

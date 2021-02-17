import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  throwError
} from 'rxjs';
import {
  tap,
  switchMap,
  filter,
  take,
  catchError
} from "rxjs/operators";
import {
  Router
} from '@angular/router';
import {
  TokenService
} from '../service/token.service';
import {
  AuthService
} from '@app/service/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject < any > = new BehaviorSubject < any > (null);

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    let token = this.tokenService.getToken();

    if (token != null) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(clonedReq).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.tokenService.removeToken();
          this.authService.removeUserInfo();
          this.router.navigateByUrl('/auth/login');
          
          return throwError(error);
        } else {
          return throwError(error);
        }
      }));
    } else {
      return next.handle(req.clone());
    }
  }

  private addToken(req: HttpRequest < any > , token: string) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
}

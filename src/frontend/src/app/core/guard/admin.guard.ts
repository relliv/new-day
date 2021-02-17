import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {
  AuthService
} from '@app/service/auth.service';
import {
  TokenService
} from '@app/service/token.service';

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let tokenIsValid = this.tokenService.tokenIsValid();
    let userRole = this.authService.getUserRole();

    if (userRole == 'admin' && tokenIsValid) {
      return true;
    } else if (userRole != 'admin' && tokenIsValid) {
      this.router.navigate(['/auth/forbidden']);
    } else {
      this.router.navigate(['/auth/forbidden'], {
        queryParams: {
          returnUrl: state.url
        }
      });
    }

    return false;
  }
}

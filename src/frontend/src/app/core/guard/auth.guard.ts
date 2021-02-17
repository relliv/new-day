import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
// import {
//   TokenService
// } from '@app/service/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    //private tokenService: TokenService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return true;

    // if (this.tokenService.tokenIsValid()) {
    //   return true;
    // }

    // this.router.navigate(['/auth/login'], {
    //   queryParams: {
    //     returnUrl: state.url
    //   }
    // });

    // return false;
  }
}

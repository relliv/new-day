import {
  Component,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  environment
} from '@env';
import {
  Observable
} from 'rxjs';
import {
  ThemeService
} from 'app/core/service/theme.service';
import {
  Router,
  NavigationEnd
} from '@angular/router';
// import { AuthService } from '@app/service/auth.service';
// import { TokenService } from '@app/service/token.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // user info
  //public user;

  // theming
  public isDarkTheme$: Observable < boolean > ;

  @Output() toggleSidenav = new EventEmitter < void > ();

  constructor(
    //private themeService: ThemeService,
    private router: Router,
    // private toastr: ToastrService,
    // private authService: AuthService,
    // private tokenService: TokenService
  ) {
    //this.getUserInfo();
  }

  ngOnInit() {
    //this.isDarkTheme$ = this.themeService.getDarkTheme();
  }

  // getUserInfo() {
  //   this.user = this.authService.getUserInfo();
  // }


  // /**
  //  * Log out current authenticated user
  //  */
  // public logout(){
  //   this.authService.logout().subscribe(
  //     (res: any) => {
  //       this.tokenService.removeToken();
  //       this.authService.removeUserInfo();
  //       this.router.navigateByUrl('/auth/login');
  //     },
  //     err => {
  //       this.toastr.error(err.error.message, 'Hata');
  //     }
  //   );
  // }

  toggleTheme(checked: boolean) {
    //this.themeService.setDarkTheme(checked);
  }
}

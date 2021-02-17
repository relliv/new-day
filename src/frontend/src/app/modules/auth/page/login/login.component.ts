import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewRef
} from '@angular/core';
import {
  Router, ActivatedRoute
} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  AuthService
} from '@app/service/auth.service';
import {
  TokenService
} from '@app/service/token.service';

import { AccessToken } from '@data/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // form properties
  public error: string;
  public isLoading: boolean;
  public loginForm: FormGroup;
  public returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.buildForm();

    if (this.tokenService.tokenIsValid()) {
      this.router.navigateByUrl('/dashboard');
    } else {


      let token = this.route.snapshot.queryParamMap.get('token');

      if (token) {
        this.loginForm.patchValue({
          token: token
        });
      }
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnInit() {
  }

  /**
   * Login
   */
  public login(): void {
    this.isLoading = true;

    this.authService.authUser(this.loginForm.value, 'login').subscribe(
      (res: any) => {
        if (this.tokenService.handle(res)) {
          this.authService.changeAuthStatus(true);
          this.authService.storeUserInfo(res.user);

          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.isLoading = false;
          this.error = 'Token ayarlanamadı, tekrar giriş yapmayı deneyin.';
          this.refreshUi();
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.error = err.error.message;
        this.refreshUi();
      }
    );
  }

  /**
   * Build login form
   */
  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      token: [null]
    });
  }

  /**
   * Update UI elements
   */
  private refreshUi(): void {
    if (!(this.changeDetectorRef as ViewRef).destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * Returns form control
   */
  get getFormControl() {
    return this.loginForm.controls;
  }
}

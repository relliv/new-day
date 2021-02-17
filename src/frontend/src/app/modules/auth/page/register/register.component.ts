import { Component, ChangeDetectorRef, ViewRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';
import { TokenService } from '@app/service/token.service';

import { AccessToken } from 'app/data/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // form properties
  public error: string;
  public message: string;
  public isLoading: boolean;
  public isLoggedIn: boolean;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    if (this.tokenService.tokenIsValid()) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.buildForm();
    }
  }

  ngOnInit() {
  }

  /**
   * Register new user
   */
  public register() {
    this.isLoading = true;

    this.authService.authUser(this.registerForm.value, 'register').subscribe(
      (res: any) => {
        this.isLoggedIn = true;
        this.message = res.message;

        this.refreshUi();

        setTimeout(() => {
          this.router.navigateByUrl('/auth/login');
        }, 5000);
      },
      (err: any) => {
        this.isLoading = false;
        this.error = err.error.message;
        this.refreshUi();
      }
    );
  }

  /**
   * Build register form
   */
  private buildForm(){
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(8)]]
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
  // get getFormControl() {
  //   return this.registerForm.controls;
  // }
}

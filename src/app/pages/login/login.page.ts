import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';// Ajusta la ruta según tu estructura

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (tokens) => {
          localStorage.setItem('accessToken', tokens.access_token);
          localStorage.setItem('refreshToken', tokens.refresh_token);
          this.router.navigateByUrl('/tabs/tab1');
        },
        (error) => {
          console.error('Error en el inicio de sesión', error);
        }
      );
    }
  }
}
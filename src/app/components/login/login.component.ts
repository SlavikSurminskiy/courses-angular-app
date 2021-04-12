import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  onLogin(): void {
    const isLogin = this._auth.login({
      email: this.email,
      password: this.password
    });

    if (isLogin) {
      this._router.navigate(['courses']);
    }
  }
}

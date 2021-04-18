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
  errorMessage = '';

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  onLogin(): void {
    this._auth.login({
      email: this.email,
      password: this.password
    }).subscribe(({token}) => {
      this._auth.saveToken(token);
      this._router.navigate(['courses']);
    }, (err) => {
      this.errorMessage = err.error;
    });
  }
}

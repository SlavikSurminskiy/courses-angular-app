import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email =  '';
  password = '';

  constructor(private _auth: AuthService) { }

  onLogin(): void {
    this._auth.login({
      email: this.email,
      password: this.password
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { LoadingService } from '../../services/loading/loading.service';

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
    private _loadingServise: LoadingService,
  ) { }

  onLogin(): void {
    this._loadingServise.showLoader$.next(true);

    this._auth.login({
      email: this.email,
      password: this.password
    }).subscribe(({token}) => {
      this._loadingServise.showLoader$.next(false);

      this._auth.saveToken(token);
      this._router.navigate(['courses']);
    }, (err) => {
      this.errorMessage = err.error;
    });
  }
}

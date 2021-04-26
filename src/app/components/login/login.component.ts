import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private store: Store) { }

  onLogin(): void {
    this.store.dispatch(login({
      email: this.email,
      password: this.password,
    }));
  }
}

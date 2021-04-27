import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { logout } from '../../store/auth/auth.actions';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private _router: Router,
    private _auth: AuthService,
    private store: Store,
  ) {}

  get isLogin(): boolean {
    return this._auth.isAuthenticated();
  }

  onLogout(): void {
    this._auth.logout();
    this._router.navigate(['login']);
    this.store.dispatch(logout());
  }
}

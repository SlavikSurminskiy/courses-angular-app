import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  ) {}

  get isLogin(): boolean {
    return this._auth.isAuthenticated();
  }

  onLogout(): void {
    this._auth.logout();
    this._router.navigate(['login']);
  }
}

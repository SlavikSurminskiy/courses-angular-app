import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';

import { logout } from '../../store/auth/auth.actions';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  languages = [
    { value: 'en', viewValue: 'English' },
    { value: 'ua', viewValue: 'Українська' },
  ];

  selectedLanguage = this.languages[0].value;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _store: Store,
    private _translate: TranslateService
  ) {}

  get isLogin(): boolean {
    return this._auth.isAuthenticated();
  }

  onLanguageChange(event: MatSelectChange): void {
    this._translate.use(event.value);
  }

  onLogout(): void {
    this._auth.logout();
    this._router.navigate(['login']);
    this._store.dispatch(logout());
  }
}

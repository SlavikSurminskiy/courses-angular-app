import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _auth: AuthService,
  ) {}

  canActivate(): Observable<boolean> {
    if (!this._auth.isAuthenticated()) {
      this._router.navigate(['login']);

      return of(false);
    }

    return of(true);
  }
}

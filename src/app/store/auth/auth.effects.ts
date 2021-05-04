import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) => {
        return this._authService.login({ email, password })
        .pipe(
          map(({token}) => {
            this._authService.saveToken(token);
            this._router.navigate(['courses']);

            return AuthActions.loginSuccess({
              id: token,
              token,
              password,
              login: email,
              name: {
                first: email,
                last: email,
              }
            });
          }),
          catchError((err) => {
            this._snackBar.open(err.error || 'Something went wrong, please try later', 'Close');

            return EMPTY;
          })
        );
      })
    );
  });

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {}
}

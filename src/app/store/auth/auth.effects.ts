import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as AuthActions from './auth.actions';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) => {
        return this._authService.login({
          email, password
        })
        .pipe(
          map(({token}) => {
            this._authService.saveToken(token);
            this._router.navigate(['courses']);

            return AuthActions.loginComplete({
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
          catchError(() => EMPTY)
        );
      })
    );
  });

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _router: Router,
  ) {}
}

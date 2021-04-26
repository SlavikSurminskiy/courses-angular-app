import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

import { AuthState, initialState } from './auth.constants';

const authReducerCreator = createReducer(
  initialState,
  on(AuthActions.login, (state) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.loginComplete, (state, action) => {
    return { ...state, user: action, loading: false };
  }),
);

export function AuthReducer(state: AuthState | undefined, action: Action): AuthState {
  return authReducerCreator(state, action);
}

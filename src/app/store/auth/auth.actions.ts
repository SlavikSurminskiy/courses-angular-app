import { createAction, props } from '@ngrx/store';

import { AuthUser, UserInfo } from '../../services/auth/auth.models';

export const login = createAction('[User] LOGIN', props<AuthUser>());
export const loginSuccess = createAction('[User] LOGIN SUCCESS', props<UserInfo>());

export const logout = createAction('[User] LOGOUT');


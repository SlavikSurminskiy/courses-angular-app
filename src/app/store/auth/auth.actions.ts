import { createAction, props } from '@ngrx/store';

import { AuthUser, UserInfo } from '../../services/auth/auth.models';

export const login = createAction('[User] LOGIN', props<AuthUser>());
export const loginComplete = createAction('[User] LOGIN_SUCCESS', props<UserInfo>());

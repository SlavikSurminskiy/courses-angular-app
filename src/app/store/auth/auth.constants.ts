import { UserInfo } from '../../services/auth/auth.models';

export interface AuthState {
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

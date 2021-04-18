export interface AuthUser {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  id: number;
  token: string;
  name: {
    first: string;
    last: string;
  };
  login: string;
  password: string;
}

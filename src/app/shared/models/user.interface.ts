export type Roles = 'ADMIN_ROLE' | 'USER_ROLE';

export interface User {
  username: string;
  password: string;
}

export interface UserResponse {
  message: string;
  token: string;
  userId: number;
  role: Roles;
}

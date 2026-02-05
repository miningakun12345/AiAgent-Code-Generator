export interface User {
  id: number;
  username: string;
  password: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}


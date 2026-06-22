export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;

  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

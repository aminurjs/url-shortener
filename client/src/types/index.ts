export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (credentials: {
    name: string;
    email: string;
    password: string;
  }) => Promise<{ message: string }>;
  login: (credentials: { email: string; password: string }) => Promise<{ message: string }>;
  logout: () => Promise<void>;
  isPending: boolean;
}

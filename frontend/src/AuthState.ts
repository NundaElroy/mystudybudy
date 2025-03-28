// User interface matching your requirements
interface User {
  id: number;
  email: string;
  name: string;
  picture?: string;
}

// AuthState interface
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUserDetails: (user: User) => void;
  logout: () => void;
}
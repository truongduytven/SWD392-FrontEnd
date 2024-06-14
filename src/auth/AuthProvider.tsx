// src/auth/AuthProvider.tsx
import axios from 'axios';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import busAPI from '@/lib/busAPI';
// Define the shape of our AuthContext
interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Define the shape of User
interface User {
  userID: string,
      userName: string,
      password: string,
      fullName: string,
      email: string,
      avatar: string,
      address: string,
      otpCode: string,
      phoneNumber:string,
      balance: number,
      createDate: string,
      isVerified: true,
      status: string,
      roleID: string
      result:any
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          console.log("token ne", token)
          const response = await busAPI.get<User>('/auth/check-token', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.result.user);
          console.log("jhkjfhkj", user)
        } catch (error) {
          console.error('Fetching user information failed:', error);
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await busAPI.post('/auth/login', { email:username,password: password });
      console.log("red",response)
      const newToken = response.data.result.accessToken;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      // Redirect to home or another route after successful login
      navigate(-1);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    // Redirect to login page after logout
    navigate(-1);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

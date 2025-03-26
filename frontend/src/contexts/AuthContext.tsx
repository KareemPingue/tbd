
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  email: string;
  name: string;
  initials?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = localStorage.getItem("user");
    
    if (isAuth && storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const user = { 
          email, 
          name: email.split("@")[0],
          initials: email.charAt(0).toUpperCase()
        };
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(user));
        
        setUser(user);
        setIsAuthenticated(true);
        
        resolve();
      }, 1000);
    });
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const user = { 
          email, 
          name: `${firstName} ${lastName}`,
          initials: `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
        };
        
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(user));
        
        setUser(user);
        setIsAuthenticated(true);
        
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    
    setUser(null);
    setIsAuthenticated(false);
    
    toast.success("You have been logged out");
    navigate("/auth/login");
  };

  const requestPasswordReset = async (email: string) => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        register, 
        logout, 
        requestPasswordReset 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

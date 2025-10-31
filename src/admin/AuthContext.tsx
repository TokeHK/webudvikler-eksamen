import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  loggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const BASE_URL = "http://localhost:3001/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setLoggedIn(true);
        sessionStorage.setItem("email", `${email}`)
        sessionStorage.setItem("password", `${password}`)
        return true;
      } else {
        alert(data.error || "Login failed");
        return false;
      }
    } catch (error) {
      alert("Network error");
      return false;
    }
  };

  const logout = async () => {
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setLoggedIn(false);
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("password")
  };

  useEffect(() => {
  const storedEmail = sessionStorage.getItem("email");
  const storedPassword = sessionStorage.getItem("password");

  const sessionLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: storedEmail,
          password: storedPassword,
        }),
      });

      if (res.status === 200) {
        setLoggedIn(true);
      } else {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("password");
        window.location.reload();
      }
    } catch (error) {
      console.error("Auto login failed:", error);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  if (storedEmail && storedPassword) {
    sessionLogin();
  } else {
    setLoading(false);
  }
}, []);

/* kører hurtigt på localhost, men hvis nu det var en rigtig server er det smart at have en loader så du ved den arbejder */
if(loading) {
  <>
    loading... / checking login
  </>
}

  return (
    <AuthContext.Provider value={{ loggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

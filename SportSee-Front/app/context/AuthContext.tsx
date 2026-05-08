import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
    setLoading(false);
  }, []);

  const isAuthenticated = !!token;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

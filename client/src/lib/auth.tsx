import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextValue = {
  isAuthed: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("auth") === "1";
    setIsAuthed(stored);
  }, []);

  const signIn = () => {
    localStorage.setItem("auth", "1");
    setIsAuthed(true);
  };

  const signOut = () => {
    localStorage.removeItem("auth");
    setIsAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthed, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

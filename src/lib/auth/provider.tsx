import { createContext, useContext, type ReactNode } from "react";

/**
 * Lightweight session context for the browser-only demo build.
 * The production path wires this to Supabase Auth; until that lands,
 * everyone is a signed-in officer (the person named in Settings).
 */
type AuthValue = {
  loading: boolean;
  user: { name: string; role: string } | null;
  signOut: () => void;
};

const AuthContext = createContext<AuthValue>({
  loading: false,
  user: { name: "Demo session", role: "Manager" },
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const value: AuthValue = { loading: false, user: { name: "Demo session", role: "Manager" }, signOut: () => {} };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

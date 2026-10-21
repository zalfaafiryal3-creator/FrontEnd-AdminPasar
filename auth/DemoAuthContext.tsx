import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type DemoUser = {
  username: string;
  email: string;
};

const LEGACY_DEMO_ACCOUNTS_KEY = "pasar-admin-demo-accounts";
const LEGACY_DEMO_SESSION_KEY = "pasar-admin-demo-user";
const DEMO_SESSION_KEY = "pasar-admin-demo-user-v2";

type DemoAuthContextValue = {
  currentUser: DemoUser | null;
  isInitialized: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  updateProfile: (user: DemoUser) => string | null;
  logout: () => void;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

function readCurrentUser(): DemoUser | null {
  const savedUser = sessionStorage.getItem(DEMO_SESSION_KEY);
  if (!savedUser) {
    return null;
  }

  const parsed: unknown = JSON.parse(savedUser);
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("username" in parsed) ||
    typeof parsed.username !== "string" ||
    !("email" in parsed) ||
    typeof parsed.email !== "string"
  ) {
    throw new Error("Data sesi akun demo pada browser tidak valid.");
  }
  return { username: parsed.username, email: parsed.email };
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setCurrentUser(readCurrentUser());
    sessionStorage.removeItem(LEGACY_DEMO_ACCOUNTS_KEY);
    sessionStorage.removeItem(LEGACY_DEMO_SESSION_KEY);
    setIsInitialized(true);
  }, []);

  const value = useMemo<DemoAuthContextValue>(() => ({
    currentUser,
    isInitialized,
    login: async (identifier, password) => {
      const normalizedIdentifier = identifier.trim().toLowerCase();
      if (!normalizedIdentifier || !password) {
        return false;
      }

      const user = {
        username: normalizedIdentifier.split("@")[0],
        email: normalizedIdentifier,
      };
      sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(user));
      setCurrentUser(user);
      return true;
    },
    updateProfile: (user) => {
      if (!currentUser) {
        return "Tidak ada akun demo yang sedang masuk.";
      }

      const updatedUser = {
        username: user.username.trim(),
        email: user.email.trim().toLowerCase(),
      };
      sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return null;
    },
    logout: () => {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
      setCurrentUser(null);
    },
  }), [currentUser, isInitialized]);

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error("useDemoAuth harus digunakan di dalam DemoAuthProvider.");
  }
  return context;
}

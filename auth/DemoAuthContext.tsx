import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type DemoUser = {
  username: string;
  email: string;
};

type DemoAccount = DemoUser & {
  passwordHash: string;
};

export type DemoAccountInput = DemoUser & {
  password: string;
};

const DEMO_ACCOUNTS_KEY = "pasar-admin-demo-accounts";
const DEMO_SESSION_KEY = "pasar-admin-demo-user";

type DemoAuthContextValue = {
  currentUser: DemoUser | null;
  register: (user: DemoAccountInput) => Promise<string | null>;
  login: (identifier: string, password: string) => Promise<boolean>;
  updateProfile: (user: DemoUser) => string | null;
  logout: () => void;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

function readAccounts(): DemoAccount[] {
  const savedAccounts = sessionStorage.getItem(DEMO_ACCOUNTS_KEY);
  if (!savedAccounts) {
    return [];
  }

  const parsed: unknown = JSON.parse(savedAccounts);
  if (
    !Array.isArray(parsed) ||
    !parsed.every((account) =>
      typeof account.username === "string" &&
      typeof account.email === "string" &&
      typeof account.passwordHash === "string",
    )
  ) {
    throw new Error("Data akun demo pada sesi browser tidak valid.");
  }
  return parsed;
}

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

async function hashPassword(password: string) {
  const encodedPassword = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encodedPassword);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<DemoAccount[]>(readAccounts);
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(readCurrentUser);

  const value = useMemo<DemoAuthContextValue>(() => ({
    currentUser,
    register: async (user) => {
      const username = user.username.trim();
      const email = user.email.trim().toLowerCase();
      const duplicate = accounts.some((account) =>
        account.username.toLowerCase() === username.toLowerCase() ||
        account.email.toLowerCase() === email,
      );

      if (duplicate) {
        return "Nama pengguna atau email sudah terdaftar di sesi demo ini.";
      }

      const newAccount = { username, email, passwordHash: await hashPassword(user.password) };
      const updatedAccounts = [...accounts, newAccount];
      sessionStorage.setItem(DEMO_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
      setAccounts(updatedAccounts);
      return null;
    },
    login: async (identifier, password) => {
      const normalizedIdentifier = identifier.trim().toLowerCase();
      const account = accounts.find((candidate) =>
        candidate.username.toLowerCase() === normalizedIdentifier ||
        candidate.email.toLowerCase() === normalizedIdentifier,
      );

      if (!account || account.passwordHash !== await hashPassword(password)) {
        return false;
      }

      const user = { username: account.username, email: account.email };
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
      const duplicate = accounts.some((account) =>
        (account.username !== currentUser.username || account.email !== currentUser.email) &&
        (account.username.toLowerCase() === updatedUser.username.toLowerCase() ||
          account.email.toLowerCase() === updatedUser.email),
      );
      if (duplicate) {
        return "Nama pengguna atau email sudah digunakan akun demo lain.";
      }

      const updatedAccounts = accounts.map((account) =>
        account.username === currentUser.username && account.email === currentUser.email
          ? { ...account, ...updatedUser }
          : account,
      );
      sessionStorage.setItem(DEMO_ACCOUNTS_KEY, JSON.stringify(updatedAccounts));
      sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(updatedUser));
      setAccounts(updatedAccounts);
      setCurrentUser(updatedUser);
      return null;
    },
    logout: () => {
      sessionStorage.removeItem(DEMO_SESSION_KEY);
      setCurrentUser(null);
    },
  }), [accounts, currentUser]);

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext);
  if (!context) {
    throw new Error("useDemoAuth harus digunakan di dalam DemoAuthProvider.");
  }
  return context;
}

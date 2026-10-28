"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApiError, apiRequest } from "./api";
import type {
  ApiAuthResponse,
  ApiUser,
  AuthResult,
  AuthUser,
  RegisterInput,
  UserRole,
} from "./types";

export function getDefaultPath(role: UserRole) {
  return role === "seller" ? "/kelola-toko" : "/dashboard";
}

// Hanya mengatur TAMPILAN. Pembatasan akses sungguhan ada di backend (requireRole).
export function canAccessPath(role: UserRole, pathname: string) {
  if (role === "admin") {
    return true;
  }

  const normalizedPath = pathname.toLowerCase().replace(/%20/g, " ");
  return [
    "/kelola-toko",
    "/kelola toko",
    "/kelola-promo",
    "/kelola promo",
    "/penjual",
  ].includes(normalizedPath);
}

type AuthContextValue = {
  currentUser: AuthUser | null;
  isInitialized: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<AuthResult>;
  register: (input: RegisterInput) => Promise<AuthResult>;
  updateProfile: (user: Pick<AuthUser, "username" | "email">) => string | null;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const toAuthUser = (user: ApiUser): AuthUser => ({
  id: user.id,
  username: user.name,
  email: user.email,
  role: user.role,
});

function errorText(error: unknown, fallback: string): string {
  if (error instanceof ApiError) {
    return error.errors.length > 1 ? error.errors.join(" ") : error.message;
  }
  return fallback;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Saat halaman dibuka: tanya backend, apakah cookie login masih berlaku?
  useEffect(() => {
    let cancelled = false;

    apiRequest<{ user: ApiUser }>("/api/auth/me")
      .then((data) => {
        if (!cancelled) setCurrentUser(toAuthUser(data.user));
      })
      .catch(() => {
        if (!cancelled) setCurrentUser(null);
      })
      .finally(() => {
        if (!cancelled) setIsInitialized(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const data = await apiRequest<ApiAuthResponse>("/api/auth/login", {
        method: "POST",
        body: { email: email.trim(), password },
      });
      const user = toAuthUser(data.user);
      setCurrentUser(user);
      return { ok: true, user };
    } catch (error) {
      return { ok: false, error: errorText(error, "Login gagal diproses. Silakan coba lagi.") };
    }
  }, []);

  const register = useCallback(async (input: RegisterInput): Promise<AuthResult> => {
    try {
      const data = await apiRequest<ApiAuthResponse>("/api/auth/register", {
        method: "POST",
        body: { ...input, name: input.name.trim(), email: input.email.trim() },
      });
      const user = toAuthUser(data.user);
      setCurrentUser(user);
      return { ok: true, user };
    } catch (error) {
      return {
        ok: false,
        error: errorText(error, "Pendaftaran gagal. Silakan coba lagi."),
      };
    }
  }, []);

  const logout = useCallback(async () => {
    setCurrentUser(null);
    try {
      await apiRequest<{ message: string }>("/api/auth/logout", { method: "POST" });
    } catch {
      // Tampilan sudah logout; kalau server tidak terjangkau, cookie habis sendiri nanti.
    }
  }, []);

  // Backend belum punya endpoint ubah profil, jadi belum bisa disimpan.
  const updateProfile = useCallback(
    () => "Perubahan profil belum tersambung ke backend, sehingga belum bisa disimpan.",
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({ currentUser, isInitialized, login, register, updateProfile, logout }),
    [currentUser, isInitialized, login, register, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider.");
  }
  return context;
}
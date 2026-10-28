"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider, canAccessPath, getDefaultPath, useAuth } from "../lib/user-auth";

function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isInitialized } = useAuth();  const isPublicAuthPage = pathname === "/login" || pathname === "/register";
  const canAccessCurrentPath = currentUser
    ? canAccessPath(currentUser.role, pathname)
    : false;

  useEffect(() => {
    if (isInitialized && !currentUser && !isPublicAuthPage) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else if (
      isInitialized &&
      currentUser &&
      !isPublicAuthPage &&
      !canAccessCurrentPath
    ) {
      router.replace(getDefaultPath(currentUser.role));
    }
  }, [canAccessCurrentPath, currentUser, isInitialized, isPublicAuthPage, pathname, router]);

  if (!isPublicAuthPage && (!isInitialized || !currentUser || !canAccessCurrentPath)) {
    return null;
  }

  return children;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
      <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}

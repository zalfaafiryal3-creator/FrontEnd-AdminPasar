"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { canAccessPath, getDefaultPath, DemoAuthProvider, useDemoAuth } from "../auth/DemoAuthContext";

function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isInitialized } = useDemoAuth();
  const isLoginPage = pathname === "/login";
  const canAccessCurrentPath = currentUser
    ? canAccessPath(currentUser.role, pathname)
    : false;

  useEffect(() => {
    if (isInitialized && !currentUser && !isLoginPage) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    } else if (isInitialized && currentUser && !isLoginPage && !canAccessCurrentPath) {
      router.replace(getDefaultPath(currentUser.role));
    }
  }, [canAccessCurrentPath, currentUser, isInitialized, isLoginPage, pathname, router]);

  if (!isLoginPage && (!isInitialized || !currentUser || !canAccessCurrentPath)) {
    return null;
  }

  return children;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <DemoAuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </DemoAuthProvider>
  );
}

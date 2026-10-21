"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DemoAuthProvider, useDemoAuth } from "../auth/DemoAuthContext";

function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isInitialized } = useDemoAuth();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    if (isInitialized && !currentUser && !isLoginPage) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [currentUser, isInitialized, isLoginPage, pathname, router]);

  if (!isLoginPage && (!isInitialized || !currentUser)) {
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

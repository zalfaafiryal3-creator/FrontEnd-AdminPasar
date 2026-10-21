import { Suspense, type ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function ProtectedAdmin({ children }: { children: ReactNode }) {
  const session = (await cookies()).get("pasar-admin-session")?.value;
  if (session !== "demo") {
    redirect("/login");
  }

  return children;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f3f3f3]" aria-label="Memuat halaman admin" />}>
      <ProtectedAdmin>{children}</ProtectedAdmin>
    </Suspense>
  );
}

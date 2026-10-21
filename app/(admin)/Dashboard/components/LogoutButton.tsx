"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function logout() {
    document.cookie = "pasar-admin-session=; Path=/; SameSite=Lax; Max-Age=0";
    router.replace("/login");
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-md border border-[#dce5cf] bg-white px-2.5 py-1.5 text-[9px] font-semibold text-[#4b6515] transition hover:bg-[#f5f8ef]"
    >
      <i className="fa-solid fa-arrow-right-from-bracket mr-1" aria-hidden="true" />
      Keluar
    </button>
  );
}

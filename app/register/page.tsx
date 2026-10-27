import type { Metadata } from "next";
import HalamanRegister from "../../auth/Register/components/HalamanRegister";

export const metadata: Metadata = {
  title: "Daftar Akun Admin - Pasar Oro-Oro Dowo",
};

export default function RegisterPage() {
  return <HalamanRegister />;
}

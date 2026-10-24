
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Daftar Akun Admin - Pasar Oro-Oro Dowo";
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!nama.trim() || !email.trim() || !password) {
      setMessage("Semua kolom wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setMessage("Kata sandi minimal 6 karakter.");
      return;
    }

    if (password !== konfirmasi) {
      setMessage("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsSubmitting(true);

    try {
      const key = "pasar-admin-registered-accounts";
      const saved = localStorage.getItem(key);
      const accounts: {
        nama: string;
        email: string;
        password: string;
      }[] = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(accounts)) {
        throw new Error("Data akun tidak valid.");
      }

      const normalizedEmail = email.trim().toLowerCase();

      if (
        accounts.some(
          (account) => account.email === normalizedEmail
        )
      ) {
        setMessage("Email sudah terdaftar. Silakan masuk.");
        return;
      }

      accounts.push({
        nama: nama.trim(),
        email: normalizedEmail,
        password,
      });

      localStorage.setItem(key, JSON.stringify(accounts));

      router.push("/login?registered=1");
    } catch {
      setMessage("Pendaftaran gagal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f8f7ed] px-4 py-8 text-[#352d20]">
      <section className="w-full max-w-[360px] rounded-[20px] border border-white bg-white/90 p-6 shadow-xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#dcebb8] text-[#4b6515]">
            <i className="fa-solid fa-user-plus" aria-hidden="true" />
          </span>

          <div>
            <h1 className="text-lg font-bold text-[#304722]">
              Daftar Akun Admin
            </h1>
            <p className="text-[10px] text-[#6c7569]">
              Buat akun untuk mengakses Pasar Oro-Oro Dowo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          <div>
            <label htmlFor="nama" className="text-xs font-semibold">
              Nama Lengkap
            </label>
            <input
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap"
              autoComplete="name"
              required
              className="mt-1 h-10 w-full rounded-lg border border-[#e5e8d9] bg-[#fffefa] px-3 text-xs outline-none focus:border-[#8cae4e]"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-xs font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email aktif"
              autoComplete="email"
              required
              className="mt-1 h-10 w-full rounded-lg border border-[#e5e8d9] bg-[#fffefa] px-3 text-xs outline-none focus:border-[#8cae4e]"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-xs font-semibold">
              Kata Sandi
            </label>
            <div className="mt-1 flex h-10 items-center rounded-lg border border-[#e5e8d9] bg-[#fffefa] px-3 focus-within:border-[#8cae4e]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Buat kata sandi"
                autoComplete="new-password"
                required
                className="w-full bg-transparent text-xs outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                className="ml-2 text-[#4b6515]"
              >
                <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="konfirmasi" className="text-xs font-semibold">
              Konfirmasi Kata Sandi
            </label>
            <input
              id="konfirmasi"
              type={showPassword ? "text" : "password"}
              value={konfirmasi}
              onChange={(e) => setKonfirmasi(e.target.value)}
              placeholder="Ulangi kata sandi"
              autoComplete="new-password"
              required
              className="mt-1 h-10 w-full rounded-lg border border-[#e5e8d9] bg-[#fffefa] px-3 text-xs outline-none focus:border-[#8cae4e]"
            />
          </div>

          {message && (
            <p role="alert" className="text-xs text-red-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 flex h-10 items-center justify-center gap-2 rounded-lg bg-[#ffc329] text-xs font-bold text-[#304722] shadow-md transition hover:bg-[#f4b313] disabled:opacity-60"
          >
            {isSubmitting ? "Membuat akun..." : "Buat Akun"}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="mt-4 text-center text-[10px] text-[#6c7569]">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#4b6515] underline"
          >
            Masuk di sini
          </Link>
        </p>
      </section>
    </main>
  );
}

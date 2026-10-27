"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("admin.utama@pasaroro.id");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Login Admin - Pasar Oro-Oro Dowo";
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");
    setForgotMessage("");

    if (!username.trim() || !password || !category) {
      setAuthMessage("Email, kata sandi, dan kategori wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    // Sesi demo untuk tampilan frontend.
    document.cookie =
      `pasar-admin-session=demo; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 8}`;

    const destination =
      category === "penjual" ? "/kelola-toko" : "/dashboard";

    router.replace(destination);
  }

  return (
    <main className="grid min-h-screen min-h-dvh grid-cols-1 overflow-hidden bg-[#f8f7ed] text-[#35452c] md:grid-cols-[54%_46%]">

      {/* PANEL KIRI */}
      <section className="relative hidden min-h-screen overflow-hidden rounded-r-[5px] md:block">
        <Image
          src="/assets/login-background.jpg"
          alt="Pasar Rakyat Oro-Oro Dowo"
          fill
          priority
          sizes="(min-width: 768px) 54vw, 100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#183c2e]/55 via-[#1e3823]/35 to-[#152b19]/85" />

        {/* Logo dan nama pasar */}
        <div className="absolute left-7 top-7 z-10 flex items-center gap-2">
          <Image
            src="/assets/logo-pasar.png"
            alt="Logo Pasar Oro-Oro Dowo"
            width={200}
            height={200}
            quality={100}
            className="h-[52px] w-[52px] rounded-2xl object-contain"
          />
          <div className="text-white">
            <p className="text-[11px] font-bold leading-tight">
              Pasar Oro-Oro Dowo
            </p>
            <p className="mt-0.5 text-[7px] text-white/80">
              Tradisi, Rasa, dan Ekonomi Rakyat
            </p>
          </div>
        </div>

        {/* Judul di tengah foto */}
        <div className="absolute left-5 right-5 top-[32%] z-10 text-center">
          <p className="text-[clamp(20px,3vw,30px)] font-extrabold leading-tight text-[#ffbd1b] [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
            PASAR RAKYAT
            <br />
            ORO-ORO DOWO
          </p>
          <div className="mx-auto mt-3 h-[3px] w-[82%] bg-white/75" />
        </div>

        {/* Sambutan bawah */}
        <div className="absolute bottom-[14%] left-7 right-7 z-10 text-white">
          <p className="mb-2 text-[10px] font-semibold">
            Selamat Datang di
          </p>
          <h1 className="text-[clamp(22px,3vw,32px)] font-extrabold leading-tight">
            Website Admin
            <br />
            Pasar Oro-Oro Dowo
          </h1>
          <p className="mt-3 max-w-[350px] text-[9px] leading-relaxed text-white/85">
            Kelola data pasar, toko, promo, dan berbagai informasi penting
            lainnya dengan mudah dan aman.
          </p>
        </div>

        {/* Ornamen dekoratif */}
        <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-[#c5df78]/90" />
        <div className="absolute -bottom-28 right-[-70px] size-[260px] rounded-full border-[35px] border-[#c5df78]/70" />
      </section>

      {/* PANEL KANAN */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 sm:px-10 md:px-8 lg:px-14">
        {/* Ornamen pojok */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-[#dcebb8]/50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 size-40 rounded-full bg-[#e5edcf]/60"
        />

        <div className="relative z-10 w-full max-w-[360px]">
          {/* Logo mobile */}
          <div className="mb-6 flex items-center gap-2 md:hidden">
            <Image
              src="/assets/logo-pasar.png"
              alt="Logo Pasar Oro-Oro Dowo"
              width={200}
              height={200}
              quality={100}
              className="h-[52px] w-[52px] rounded-2xl object-contain"
            />
            <div>
              <p className="text-xs font-bold">Pasar Oro-Oro Dowo</p>
              <p className="text-[9px] text-[#79826e]">Admin Panel</p>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#e9e8de] bg-white px-5 py-6 shadow-[0_12px_30px_rgba(49,63,33,0.12)] sm:px-7 sm:py-7">
            {/* Judul form */}
            <header className="mb-5 flex items-start gap-3">
              <div className="grid size-[38px] shrink-0 place-items-center rounded-xl bg-[#e3edc6] text-[#4b6515]">
                <i className="fa-solid fa-house text-sm" />
              </div>
              <div>
                <h2 className="text-[15px] font-bold leading-tight text-[#35452c]">
                  Masuk ke Akun Admin
                </h2>
                <p className="mt-1 text-[8px] leading-relaxed text-[#858b7d]">
                  Silakan login untuk melanjutkan ke dashboard admin
                  Pasar Oro-Oro Dowo.
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email */}
              <div>
                <label
                  htmlFor="admin-username"
                  className="mb-1 block text-[9px] font-semibold text-[#46513b]"
                >
                  Email atau Username
                </label>

                <div className="flex h-[34px] items-center gap-2 rounded-lg border border-[#e9e8de] bg-[#fffefa] px-2.5 transition focus-within:border-[#9eb75d]">
                  <i className="fa-regular fa-envelope text-[10px] text-[#8b927e]" />
                  <input
                    id="admin-username"
                    type="email"
                    autoComplete="username"
                    placeholder="Masukkan email atau username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    className="h-full min-w-0 flex-1 bg-transparent text-[9px] text-[#35452c] outline-none placeholder:text-[#a0a395]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-1 block text-[9px] font-semibold text-[#46513b]"
                >
                  Kata Sandi
                </label>

                <div className="flex h-[34px] items-center gap-2 rounded-lg border border-[#e9e8de] bg-[#fffefa] px-2.5 transition focus-within:border-[#9eb75d]">
                  <i className="fa-solid fa-lock text-[10px] text-[#8b927e]" />
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-full min-w-0 flex-1 bg-transparent text-[9px] text-[#35452c] outline-none placeholder:text-[#a0a395]"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((value) => !value)}
                    className={`grid size-6 shrink-0 place-items-center text-[10px] text-[#68745a] ${focusRing}`}
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
              </div>

              {/* Kategori akun */}
              <div>
                <label
                  htmlFor="account-category"
                  className="mb-1 block text-[9px] font-semibold text-[#46513b]"
                >
                  Kategori
                </label>

                <div className="flex h-[34px] items-center gap-2 rounded-lg border border-[#e9e8de] bg-[#fffefa] px-2.5">
                  <i className="fa-solid fa-users text-[10px] text-[#8b927e]" />
                  <select
                    id="account-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="h-full min-w-0 flex-1 bg-transparent text-[9px] text-[#7b8171] outline-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="penjual">Penjual</option>
                  </select>
                </div>
              </div>

              {/* Ingat saya dan lupa password */}
              <div className="flex items-center justify-between gap-2 text-[8px]">
                <label className="flex cursor-pointer items-center gap-1.5 text-[#747c68]">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="size-[11px] accent-[#4b6515]"
                  />
                  Ingat saya
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setForgotMessage(
                      "Silakan hubungi Super Admin untuk mengatur ulang kata sandi.",
                    )
                  }
                  className={`font-semibold text-[#4b6515] underline underline-offset-2 ${focusRing}`}
                >
                  Lupa password?
                </button>
              </div>

              {forgotMessage && (
                <p role="status" className="text-[9px] leading-relaxed text-[#68745a]">
                  {forgotMessage}
                </p>
              )}

              {authMessage && (
                <p role="alert" className="text-[9px] text-red-600">
                  {authMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex h-[35px] w-full items-center justify-center gap-2 rounded-lg bg-[#ffbd1b] text-[10px] font-bold text-[#493a12] shadow-[0_4px_9px_rgba(217,164,24,0.22)] transition hover:bg-[#f4b313] disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
              >
                {isSubmitting ? "Memproses..." : "Masuk ke Dashboard"}
                <i className="fa-solid fa-arrow-right text-[9px]" />
              </button>

              <div className="flex items-center gap-2 pt-0.5">
                <div className="h-px flex-1 bg-[#eeeee5]" />
                <span className="text-[7px] text-[#a3a697]">atau</span>
                <div className="h-px flex-1 bg-[#eeeee5]" />
              </div>

              <p className="text-center text-[8px] text-[#858b7d]">
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className={`font-bold text-[#4b6515] underline underline-offset-2 ${focusRing}`}
                >
                  Daftar di sini
                </Link>
              </p>
            </form>
          </div>

          <p className="mt-4 text-center text-[8px] text-[#929784]">
            © {new Date().getFullYear()} Pasar Oro-Oro Dowo · Malang
          </p>
        </div>
      </section>
    </main>
  );
}
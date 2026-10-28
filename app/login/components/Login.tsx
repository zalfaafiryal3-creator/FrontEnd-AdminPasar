
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getDefaultPath, useAuth } from "../../../lib/user-auth";
import { validateLogin } from "../../../lib/validation/auth";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]";

export default function Login() {
  const router = useRouter();
  const { currentUser, isInitialized, login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Login Admin - Pasar Oro-Oro Dowo";
  }, []);

  useEffect(() => {
    if (isInitialized && currentUser) {
      router.replace(
        currentUser.role === "seller" ? "/kelola-toko" : "/dashboard"
      );
    }
  }, [currentUser, isInitialized, router]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setAuthMessage("");
    setForgotMessage("");

    const validationError = validateLogin(username, password);
    if (validationError) {
      setAuthMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(username, password);

      if (!result.ok) {
        setAuthMessage(result.error);
        return;
      }

      const from = new URLSearchParams(window.location.search).get("from");

      const destination =
        from?.startsWith("/") &&
        !from.startsWith("//") &&
        from !== "/login"
          ? from
          : getDefaultPath(result.user.role);

      router.replace(destination);
    } catch {
      setAuthMessage("Login gagal diproses. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-screen min-h-dvh w-full overflow-hidden bg-[#f7f6eb] text-[#26351f]">

      {/* Sisi kiri: gambar dan identitas pasar */}
      <section className="relative hidden min-h-screen w-[54%] shrink-0 overflow-hidden bg-[#344b32] md:block">

        <Image
          src="/assets/login-background.jpg"
          alt=""
          fill
          priority
          sizes="54vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#172515]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b2c18]/50 via-transparent to-[#132211]/55" />

        {/* Ornamen ❧ */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 -top-10 rotate-[30deg] text-[160px] leading-none text-[#a4bd61]/30"
        >
          ❧
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-14 -left-10 -rotate-[30deg] text-[140px] leading-none text-[#a4bd61]/30"
        >
          ❧
        </span>

        <header className="absolute left-7 top-7 z-10 flex items-center gap-3">
          <Image
            src="/assets/logo-pasar.png"
            alt="Logo Pasar Oro-Oro Dowo"
            width={200}
            height={200}
            quality={100}
            className="h-[52px] w-[52px] rounded-2xl object-contain"
          />
          <div>
            <p className="text-sm font-bold text-white">
              Pasar Oro-Oro Dowo
            </p>
            <p className="mt-0.5 text-[9px] italic text-white/80">
              Tradisi, Rasa, dan Ekonomi Rakyat
            </p>
          </div>
        </header>

        <div className="absolute inset-x-0 top-[34%] z-10 px-5 text-center">
          <div className="mx-auto max-w-[430px] border-y-2 border-white/70 py-3">
            <h2 className="text-[clamp(23px,3vw,36px)] font-black leading-[1.08] text-[#ffc21b]">
              PASAR RAKYAT
              <br />
              ORO-ORO DOWO
            </h2>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute -left-6 top-[46%] h-[90px] w-[calc(100%+48px)] bg-[repeating-linear-gradient(90deg,transparent_0%,transparent_7.9%,rgba(19,34,17,0.42)_8%,rgba(19,34,17,0.42)_8.75%,transparent_8.75%,transparent_16.6%)]"
        />

        <div className="absolute -bottom-6 -left-16 h-[260px] w-[360px] rounded-t-[170px] bg-[#c2dc80]/90" />
        <div className="absolute -bottom-20 -right-20 size-[420px] rounded-full border-[45px] border-[#c2dc80]/70" />

        <div className="absolute bottom-0 left-0 z-10 max-w-[480px] p-7 pb-10 text-white lg:p-9">
          <p className="mb-2 text-[10px] font-semibold">
            Selamat Datang di
          </p>
          <h1 className="text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.12]">
            Website Admin
            <br />
            Pasar Oro-Oro Dowo
          </h1>
          <p className="mt-3 max-w-[360px] text-[10px] leading-relaxed text-white/85">
            Kelola data pasar, toko, promo, dan berbagai informasi penting
            lainnya dengan mudah dan aman.
          </p>
        </div>
      </section>

      {/* Sisi kanan: form login */}
      <section className="relative flex min-h-screen min-h-dvh flex-1 items-center justify-center overflow-hidden px-5 py-10 sm:px-8 md:px-10">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 size-52 rounded-full bg-[#dcebb8]/70 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 size-52 rounded-full bg-[#dcebb8]/60 blur-3xl"
        />

        <div className="relative w-full max-w-[380px]">

          {/* Logo versi mobile */}
          <div className="mb-6 flex items-center gap-3 md:hidden">
            <Image
              src="/assets/logo-pasar.png"
              alt="Logo Pasar Oro-Oro Dowo"
              width={200}
              height={200}
              quality={100}
              className="h-[52px] w-[52px] rounded-2xl object-contain"
            />
            <div>
              <p className="text-sm font-bold text-[#354b27]">
                Pasar Oro-Oro Dowo
              </p>
              <p className="text-[10px] text-[#68765c]">
                Admin Panel
              </p>
            </div>
          </div>

          <div className="rounded-[22px] border border-white bg-white/95 p-6 shadow-[0_12px_35px_rgba(52,70,34,0.12)] sm:p-8">

            <header className="mb-6">
              <div className="mb-4 grid size-[42px] place-items-center rounded-xl bg-[#e4efc9] text-lg text-[#4b6515]">
                <i className="fa-solid fa-house" aria-hidden="true" />
              </div>

              <h2 className="text-[20px] font-bold leading-tight text-[#344b28]">
                Masuk ke Akun Admin
              </h2>

              <p className="mt-1.5 text-[10px] leading-relaxed text-[#7b8273]">
                Silakan login untuk melanjutkan ke dashboard admin
                Pasar Oro-Oro Dowo.
              </p>
            </header>

            <form className="grid gap-4" onSubmit={handleSubmit}>

              <div className="min-w-0">
                <label
                  htmlFor="admin-username"
                  className="mb-1.5 block text-[10px] font-semibold text-[#394331]"
                >
                  Email atau Username
                </label>

                <div className="flex h-[42px] items-center gap-2.5 rounded-[10px] border border-[#e8e9dc] bg-[#fffefa] px-3 transition focus-within:border-[#a5c76c] focus-within:ring-2 focus-within:ring-[#dcebb8]/60">
                  <i
                    className="fa-regular fa-envelope text-xs text-[#89917d]"
                    aria-hidden="true"
                  />

                  <input
                    id="admin-username"
                    name="username"
                    type="email"
                    autoComplete="username"
                    placeholder="Masukkan email atau username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-[10px] text-[#30392a] outline-none placeholder:text-[#a2a598]"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="admin-password"
                  className="mb-1.5 block text-[10px] font-semibold text-[#394331]"
                >
                  Kata Sandi
                </label>

                <div className="flex h-[42px] items-center gap-2.5 rounded-[10px] border border-[#e8e9dc] bg-[#fffefa] px-3 transition focus-within:border-[#a5c76c] focus-within:ring-2 focus-within:ring-[#dcebb8]/60">
                  <i
                    className="fa-solid fa-lock text-xs text-[#89917d]"
                    aria-hidden="true"
                  />

                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-full min-w-0 flex-1 border-0 bg-transparent text-[10px] text-[#30392a] outline-none placeholder:text-[#a2a598]"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Sembunyikan kata sandi"
                        : "Tampilkan kata sandi"
                    }
                    aria-pressed={showPassword}
                    onClick={() =>
                      setShowPassword((visible) => !visible)
                    }
                    className={`grid size-7 shrink-0 place-items-center rounded-md text-[#68765c] hover:bg-[#edf3df] ${focusRing}`}
                  >
                    <i
                      className={`fa-regular ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setForgotMessage(
                        "Silakan hubungi Super Admin untuk mengatur ulang kata sandi."
                      )
                    }
                    className={`text-[9px] font-medium text-[#4b6515] underline underline-offset-2 hover:text-[#34490f] ${focusRing}`}
                  >
                    Lupa password?
                  </button>
                </div>

                {forgotMessage && (
                  <p
                    role="status"
                    className="mt-2 rounded-lg bg-[#f1f6e7] p-2 text-[10px] leading-relaxed text-[#4b6515]"
                  >
                    {forgotMessage}
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-[9px] text-[#6e7665]">
                <input
                  type="checkbox"
                  className="size-3 accent-[#4b6515]"
                />
                Ingat saya
              </label>

              {authMessage && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-2.5 text-[10px] leading-relaxed text-red-700"
                >
                  {authMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !isInitialized}
                className={`flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#ffc21b] px-4 text-[11px] font-bold text-[#4b421c] shadow-[0_5px_12px_rgba(214,164,21,0.2)] transition hover:-translate-y-px hover:bg-[#f4b313] disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`}
              >
                {isSubmitting ? "Memeriksa akun..." : "Masuk ke Dashboard"}

                {!isSubmitting && (
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                )}
              </button>

              {/* Google Sign‑in button */}
              <button
                type="button"
                onClick={() => {
                  console.log("Google sign‑in clicked – configure client ID");
                }}
                className={`flex w-full items-center justify-center gap-2 rounded-[10px] bg-white px-4 py-2 text-sm font-medium text-[#4b6515] shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-[#f5f5f5] ${focusRing}`}
              >
                <svg viewBox="0 0 533.5 544.3" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M533.5 278.4c0-17.8-1.6-35-4.6-51.6H272v97.7h147.4c-6.4 34.5-25.7 63.7-54.7 83.2v68.9h88.4c51.8-47.8 81.4-118.5 81.4-198.2z"/>
                  <path fill="#34A853" d="M272 544.3c73.5 0 135.2-24.4 180.2-66.2l-88.4-68.9c-24.4 16.4-55.5 26-91.8 26-70.5 0-130.2-47.5-151.6-111.4H30.5v69.9c45 89.6 138.5 150.6 241.5 150.6z"/>
                  <path fill="#FBBC05" d="M120.4 323.8c-5.5-16.4-8.6-33.8-8.6-51.8s3.1-35.4 8.6-51.8V150.3H30.5c-18.5 36.7-29 78.9-29 122.7s10.5 86 29 122.7l89.9-69.9z"/>
                  <path fill="#EA4335" d="M272 107.7c39.9 0 75.8 13.7 104.1 40.6l78.1-78.1C416.1 24.5 349.5 0 272 0 169 0 75.5 61 30.5 150.3l89.9 69.9C141.8 155.2 201.5 107.7 272 107.7z"/>
                  <path fill="none" d="M0 0h533.5v544.3H0z"/>
                </svg>
                <span>Masuk dengan Google</span>
              </button>

              <div className="flex items-center gap-3 text-[9px] text-[#b3b5aa]">
                <div className="h-px flex-1 bg-[#e9eadf]" />
                <span>atau</span>
                <div className="h-px flex-1 bg-[#e9eadf]" />
              </div>

              <p className="text-center text-[9px] text-[#858a7b]">
                Belum punya akun?{" "}
                <a
                  href="/register"
                  className="font-semibold text-[#4b6515] underline underline-offset-2"
                >
                  Daftar di sini
                </a>
              </p>

            </form>
          </div>

          <p className="mt-4 text-center text-[9px] text-[#8a8e7e]">
            © Pasar Oro-Oro Dowo · Malang
          </p>
        </div>
      </section>
    </main>
  );
}

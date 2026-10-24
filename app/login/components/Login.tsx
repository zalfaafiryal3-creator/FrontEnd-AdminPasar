
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDemoAuth } from "../../../auth/DemoAuthContext";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]";

export default function Login() {
  const router = useRouter();
  const { currentUser, isInitialized, login } = useDemoAuth();

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

    if (!username.trim() || !password) {
      setAuthMessage("Email dan kata sandi wajib diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(username, password, "admin");

      if (!success) {
        setAuthMessage("Email dan kata sandi wajib diisi.");
        return;
      }

      const from = new URLSearchParams(window.location.search).get("from");

      const destination =
        from?.startsWith("/") &&
        !from.startsWith("//") &&
        from !== "/login"
          ? from
          : "/dashboard";

      router.replace(destination);
    } catch {
      setAuthMessage(
        "Login gagal diproses. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-screen min-h-dvh w-full overflow-hidden bg-[#f7f6eb] text-[#26351f]">

      {/* Sisi kiri: gambar dan identitas pasar */}
      <section className="relative hidden min-h-screen w-[54%] shrink-0 overflow-hidden bg-[#344b32] md:block">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(28,48,32,0.48), rgba(26,46,27,0.78)), url('/assets/login-background.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#263d23]/60" />

        <header className="absolute left-7 top-7 z-10 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-[#ffc21b] text-[#4b6515]">
            <i className="fa-solid fa-store" aria-hidden="true" />
          </div>

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

        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-20 size-64 rounded-full border-[35px] border-[#c5df78]/70"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-28 -left-16 size-64 rounded-[45%] bg-[#c5df78]/90"
        />
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
            <div className="grid size-10 place-items-center rounded-xl bg-[#ffc21b] text-[#4b6515]">
              <i className="fa-solid fa-store" aria-hidden="true" />
            </div>

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

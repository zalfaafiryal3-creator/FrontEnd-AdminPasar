"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#4b6515]";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("admin.utama@pasaroro.id");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Login Admin - Pasar Oro-Oro Dowo";
  }, []);

  useEffect(() => {
    if (document.cookie.split("; ").includes("pasar-admin-session=demo")) {
      router.replace("/Dashboard");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");
    if (!username.trim() || !password) {
      setAuthMessage("Nama pengguna/email dan kata sandi wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    document.cookie = `pasar-admin-session=demo; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 8}`;

    const from = new URLSearchParams(window.location.search).get("from");
    const destination =
      from?.startsWith("/") && !from.startsWith("//") && from !== "/login"
        ? from
        : "/Dashboard";
    router.replace(destination);
  }

  return (
    <main className="relative isolate grid min-h-screen min-h-dvh place-items-center overflow-hidden bg-[linear-gradient(180deg,#b7d0d5_0%,#d1ddd0_43%,#657969_44%,#32483a_100%)] px-4 py-7 text-[#352d20] max-[420px]:px-3.5 max-[420px]:py-5">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(33,53,41,0.14),rgba(24,37,29,0.55)),repeating-linear-gradient(90deg,transparent_0,transparent_9%,rgba(255,255,255,0.08)_9.2%,transparent_9.5%),linear-gradient(180deg,transparent_35%,rgba(72,77,57,0.6)_36%,transparent_38%)]"
      />

      <section
        className="w-[min(100%,364px)] rounded-[21px] border border-white/90 bg-[#c5df78] p-6 shadow-[0_12px_28px_rgba(28,43,21,0.25)] max-[420px]:px-5 max-[420px]:py-[22px]"
        aria-labelledby="login-title"
      >
        <header className="flex flex-col items-center text-center">
          <span className="inline-flex min-h-4 items-center gap-[5px] rounded-full bg-[#d9eea0] px-[11px] py-[3px] text-[8px] font-medium leading-[1.2] text-[#4b6515]">
            <span className="size-1.5 rounded-full bg-[#4b6515]" aria-hidden="true" />
            Sistem Manajemen Pasar &amp; Marketplace
          </span>
          <span className="mt-2 text-xl text-[#4b6515]" aria-hidden="true">
            <i className="fa-solid fa-landmark" />
          </span>
          <h1
            id="login-title"
            className="mt-[5px] text-base font-semibold leading-[1.35] text-white [text-shadow:0_1px_2px_rgba(35,55,14,0.55)]"
          >
            Pasar Oro-Oro Dowo
          </h1>
          <p className="mt-[3px] text-[9px] italic leading-[1.4] text-[#55652e]">Malang</p>
        </header>

        <div className="mt-3 flex items-start gap-[9px] rounded-[13px] bg-[#4b6515] px-[11px] py-3.5">
          <span
            className="mt-px grid size-[25px] shrink-0 place-items-center rounded-lg bg-[#fbbf24] text-xs text-white"
            aria-hidden="true"
          >
            <i className="fa-solid fa-comments" />
          </span>
          <div>
            <h2 className="mb-[3px] text-[13px] font-medium leading-[1.35] text-[#ffc21b]">
              Selamat Datang, Admin 👋
            </h2>
            <p className="max-w-60 text-[9px] leading-[1.45] text-white">
              Silakan masukkan kredensial akun untuk mengakses panel operasional
              toko, promo, dan pedagang terdaftar.
            </p>
          </div>
        </div>

        <form className="mt-[15px] grid gap-[11px]" onSubmit={handleSubmit}>
          <div className="min-w-0">
            <label
              htmlFor="admin-username"
              className="block text-[9px] font-medium leading-[1.4] text-[#302b1e]"
            >
              Nama Pengguna / Email Admin
            </label>
            <div className="mt-[5px] flex h-[34px] items-center gap-[9px] rounded-[10px] border border-[rgba(75,101,21,0.07)] bg-[#4b6515] px-[11px] shadow-[0_1px_2px_rgba(75,101,21,0.04)] transition-[border-color,box-shadow] duration-150 focus-within:border-[#8cae4e] focus-within:shadow-[0_0_0_3px_rgba(194,220,128,0.28)]">
              <i className="fa-regular fa-user shrink-0 text-[11px] text-[#eef5dc]" aria-hidden="true" />
              <input
                id="admin-username"
                type="email"
                autoComplete="username"
                placeholder="admin.utama@pasaroro.id"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-[10px] text-white outline-0 placeholder:text-white/[0.74]"
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="admin-password"
                className="block text-[9px] font-medium leading-[1.4] text-[#302b1e]"
              >
                Kata Sandi
              </label>
              <button
                className={`cursor-pointer p-0 text-[8px] text-[#4b6515] underline underline-offset-2 hover:text-[#34490f] ${focusRing}`}
                type="button"
                onClick={() =>
                  setForgotMessage(
                    "Silakan hubungi Super Admin untuk mengatur ulang kata sandi.",
                  )
                }
              >
                Lupa kata sandi?
              </button>
            </div>
            <div className="mt-[5px] flex h-[34px] items-center gap-[9px] rounded-[10px] border border-[rgba(75,101,21,0.07)] bg-[#4b6515] px-[11px] shadow-[0_1px_2px_rgba(75,101,21,0.04)] transition-[border-color,box-shadow] duration-150 focus-within:border-[#8cae4e] focus-within:shadow-[0_0_0_3px_rgba(194,220,128,0.28)]">
              <i className="fa-solid fa-lock shrink-0 text-[11px] text-[#eef5dc]" aria-hidden="true" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="h-full w-full min-w-0 border-0 bg-transparent p-0 text-[10px] text-white outline-0 placeholder:text-white/[0.74]"
              />
              <button
                className={`grid h-[26px] w-[22px] shrink-0 cursor-pointer place-items-center p-0 text-[#eef5dc] hover:text-[#4b6515] ${focusRing}`}
                type="button"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                <i
                  className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  aria-hidden="true"
                />
              </button>
            </div>
            {forgotMessage && (
              <p className="mt-[5px] text-[9px] leading-[1.4] text-[#4b6515]" role="status">
                {forgotMessage}
              </p>
            )}
          </div>

          {authMessage && (
            <p className="text-[9px] leading-[1.45] text-[#8c302b]" role="alert">
              {authMessage}
            </p>
          )}

          <button
            className={`-mt-px flex min-h-[34px] w-full cursor-pointer items-center justify-center gap-[5px] rounded-[10px] bg-[#fbbf24] text-[10px] font-medium text-white shadow-[0_5px_10px_rgba(182,135,16,0.22)] transition duration-150 hover:-translate-y-px hover:bg-[#f4b313] hover:shadow-[0_7px_14px_rgba(182,135,16,0.28)] ${focusRing}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Memeriksa akun..." : "Masuk ke Dashboard"} <span aria-hidden="true">→</span>
          </button>
        </form>
      </section>
    </main>
  );
}
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getDefaultPath, useAuth } from "../../../lib/user-auth";
import { validateRegister } from "../../../lib/validation/auth";

export default function Register() {
    const router = useRouter();
    const { register } = useAuth();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]";

  useEffect(() => {
    document.title = "Daftar Akun Admin - Pasar Oro-Oro Dowo";
  }, []);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const errors = validateRegister({
      name: nama,
      email,
      password,
      confirmPassword: konfirmasi,
    });
    if (errors.length > 0) {
      setMessage(errors.join(" "));
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register({
        name: nama,
        email,
        password,
        confirmPassword: konfirmasi,
      });

      if (!result.ok) {
        setMessage(result.error);
        return;
      }

      router.replace(getDefaultPath(result.user.role));
    } catch {
      setMessage("Pendaftaran gagal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen min-h-dvh grid-cols-1 bg-[#f8f7ee] text-[#334729] md:grid-cols-[46%_54%]">
      <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[radial-gradient(124.2%_168.61%_at_100%_0%,rgba(194,220,128,0.5)_0%,transparent_28%),radial-gradient(124.2%_168.61%_at_0%_100%,rgba(251,191,36,0.2)_0%,transparent_25%),#f8f7ee] px-4 py-10 sm:px-8 md:px-6 lg:px-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-5 -top-10 rotate-[30deg] text-[150px] leading-none text-[#a4bd61]/45"
        >
          ❧
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-14 -left-10 -rotate-[30deg] text-[130px] leading-none text-[#a4bd61]/45"
        >
          ❧
        </span>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-7 right-[-28px] h-[95px] w-[145px] rounded-t-full border-2 border-b-0 border-[#b7ca83]/60 before:absolute before:-bottom-px before:left-8 before:h-[68px] before:w-[72px] before:rounded-t-full before:border-2 before:border-b-0 before:border-[#b7ca83]/70"
        />

        <div className="relative z-10 w-full max-w-[380px]">
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
              <p className="text-[10px] text-[#68765c]">Admin Panel</p>
            </div>
          </div>

          <div className="rounded-[22px] border border-white bg-white/95 p-6 shadow-[0_12px_35px_rgba(52,70,34,0.12)] sm:p-8">
            <header className="mb-6">
              <div className="mb-4 grid size-[42px] place-items-center rounded-xl bg-[#e4efc9] text-lg text-[#4b6515]">
                <i className="fa-solid fa-house" aria-hidden="true" />
              </div>
              <h1 className="text-[20px] font-bold leading-tight text-[#344b28]">
                Daftar Akun Admin
              </h1>
              <p className="mt-1.5 text-[10px] leading-relaxed text-[#7b8273]">
                Buat akun untuk mengakses dashboard Pasar Oro-Oro Dowo.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label
                htmlFor="nama"
                className="mb-1.5 block text-[10px] font-semibold text-[#394331]"
              >
                Nama Lengkap
              </label>
              <div className="flex h-[42px] items-center gap-2.5 rounded-[10px] border border-[#e8e9dc] bg-[#fffefa] px-3 transition focus-within:border-[#a5c76c] focus-within:ring-2 focus-within:ring-[#dcebb8]/60">
                <i className="fa-regular fa-user text-xs text-[#89917d]" aria-hidden="true" />
                <input
                  id="nama"
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                  placeholder="Masukkan nama lengkap"
                  autoComplete="name"
                  required
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-[10px] text-[#30392a] outline-none placeholder:text-[#a2a598]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[10px] font-semibold text-[#394331]"
              >
                Email
              </label>
              <div className="flex h-[42px] items-center gap-2.5 rounded-[10px] border border-[#e8e9dc] bg-[#fffefa] px-3 transition focus-within:border-[#a5c76c] focus-within:ring-2 focus-within:ring-[#dcebb8]/60">
                <i className="fa-regular fa-envelope text-xs text-[#89917d]" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Masukkan email aktif"
                  autoComplete="email"
                  required
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-[10px] text-[#30392a] outline-none placeholder:text-[#a2a598]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-[10px] font-semibold text-[#394331]"
              >
                Kata Sandi
              </label>
              <div className="flex h-[42px] items-center gap-2.5 rounded-[10px] border border-[#e8e9dc] bg-[#fffefa] px-3 transition focus-within:border-[#a5c76c] focus-within:ring-2 focus-within:ring-[#dcebb8]/60">
                <i className="fa-solid fa-lock text-xs text-[#89917d]" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Buat kata sandi"
                  autoComplete="new-password"
                  required
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-[10px] text-[#30392a] outline-none placeholder:text-[#a2a598]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  className={`grid size-7 shrink-0 place-items-center rounded-md text-[#68765c] hover:bg-[#edf3df] ${focusRing}`}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                </button>
              </div>
            </div>

            <p className="-mt-2 text-[9px] leading-relaxed text-[#7b8273]">
              Minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka.
            </p>
            
            <div>
              <label
                htmlFor="konfirmasi"
                className="mb-1.5 block text-[10px] font-semibold text-[#394331]"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="flex h-[42px] items-center gap-2.5 rounded-[10px] border border-[#e8e9dc] bg-[#fffefa] px-3 transition focus-within:border-[#a5c76c] focus-within:ring-2 focus-within:ring-[#dcebb8]/60">
                <i className="fa-solid fa-lock text-xs text-[#89917d]" aria-hidden="true" />
                <input
                  id="konfirmasi"
                  type={showPassword ? "text" : "password"}
                  value={konfirmasi}
                  onChange={(event) => setKonfirmasi(event.target.value)}
                  placeholder="Ulangi kata sandi"
                  autoComplete="new-password"
                  required
                  className="h-full min-w-0 flex-1 border-0 bg-transparent text-[10px] text-[#30392a] outline-none placeholder:text-[#a2a598]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                  className={`grid size-7 shrink-0 place-items-center rounded-md text-[#68765c] hover:bg-[#edf3df] ${focusRing}`}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true" />
                </button>
              </div>
            </div>

            {message && (
              <p role="alert" className="rounded-lg bg-red-50 p-2.5 text-[10px] leading-relaxed text-red-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex min-h-[42px] w-full items-center justify-center gap-2 rounded-[10px] bg-[#ffc21b] px-4 text-[11px] font-bold text-[#4b421c] shadow-[0_5px_12px_rgba(214,164,21,0.2)] transition hover:-translate-y-px hover:bg-[#f4b313] disabled:cursor-wait disabled:opacity-70 ${focusRing}`}
            >
              {isSubmitting ? "Membuat akun..." : "Buat Akun"}
              <i className="fa-solid fa-arrow-right text-[9px]" aria-hidden="true" />
            </button>

            {/* Google Sign-in button */}
            <button
              type="button"
              onClick={() => {
                console.log("Google sign-in clicked – configure OAuth Client ID");
              }}
              className={`flex w-full items-center justify-center gap-2 rounded-[10px] bg-white px-4 py-2.5 text-[11px] font-medium text-[#4b6515] shadow-[0_2px_6px_rgba(0,0,0,0.1)] transition hover:-translate-y-px hover:bg-[#f5f5f5] ${focusRing}`}
            >
              <svg viewBox="0 0 533.5 544.3" className="h-4 w-4" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M533.5 278.4c0-17.8-1.6-35-4.6-51.6H272v97.7h147.4c-6.4 34.5-25.7 63.7-54.7 83.2v68.9h88.4c51.8-47.8 81.4-118.5 81.4-198.2z"/>
                <path fill="#34A853" d="M272 544.3c73.5 0 135.2-24.4 180.2-66.2l-88.4-68.9c-24.4 16.4-55.5 26-91.8 26-70.5 0-130.2-47.5-151.6-111.4H30.5v69.9c45 89.6 138.5 150.6 241.5 150.6z"/>
                <path fill="#FBBC05" d="M120.4 323.8c-5.5-16.4-8.6-33.8-8.6-51.8s3.1-35.4 8.6-51.8V150.3H30.5c-18.5 36.7-29 78.9-29 122.7s10.5 86 29 122.7l89.9-69.9z"/>
                <path fill="#EA4335" d="M272 107.7c39.9 0 75.8 13.7 104.1 40.6l78.1-78.1C416.1 24.5 349.5 0 272 0 169 0 75.5 61 30.5 150.3l89.9 69.9C141.8 155.2 201.5 107.7 272 107.7z"/>
                <path fill="none" d="M0 0h533.5v544.3H0z"/>
              </svg>
              <span>Daftar dengan Google</span>
            </button>
          </form>

          <p className="mt-4 text-center text-[9px] text-[#858a7b]">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className={`font-bold text-[#4b6515] underline underline-offset-2 ${focusRing}`}
            >
              Masuk di sini
            </Link>
          </p>
        </div>
        </div>
      </section>

      <section className="relative hidden min-h-dvh overflow-hidden bg-[#263d18] md:block">
        <Image
          src="/assets/login-background.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 54vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#172515]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b2c18]/50 via-transparent to-[#132211]/55" />

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
            <p className="text-sm font-bold text-white">Pasar Oro-Oro Dowo</p>
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
          <p className="mb-2 text-[10px] font-semibold">Bersama kita tumbuh</p>
          <h2 className="text-[clamp(23px,2.6vw,34px)] font-bold leading-[1.12]">
            Bangun Pasar
            <br />
            yang Lebih Maju
          </h2>
          <p className="mt-3 max-w-[360px] text-[10px] leading-relaxed text-white/85">
            Kelola informasi pasar dengan lebih tertata dan bantu pedagang serta
            pengunjung mendapatkan informasi yang mereka butuhkan.
          </p>
        </div>
      </section>
    </main>
  );
}

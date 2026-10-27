
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]";

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
            <div className="grid size-10 place-items-center rounded-xl bg-[#ffc21b] text-[#4b6515]">
              <i className="fa-solid fa-store" aria-hidden="true" />
            </div>
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
          <div className="grid size-9 place-items-center rounded-xl bg-[#ffc21b] text-[#4b6515]">
            <i className="fa-solid fa-store" aria-hidden="true" />
          </div>
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

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useDemoAuth } from "../../../auth/DemoAuthContext";

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
      router.replace("/dashboard");
    }
  }, [currentUser, isInitialized, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");
    setIsSubmitting(true);

    try {
      if (!await login(username, password)) {
        setAuthMessage("Email dan kata sandi wajib diisi.");
        return;
      }

      const from = new URLSearchParams(window.location.search).get("from");
      const destination = from?.startsWith("/") && !from.startsWith("//") && from !== "/login"
        ? from
        : "/dashboard";
      router.replace(destination);
    } catch {
      setAuthMessage("Login demo gagal memproses akun. Coba lagi pada tab browser yang sama.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative isolate grid min-h-[100vh] min-h-[100dvh] place-items-center overflow-x-hidden px-4 py-7 text-[#352d20] before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_18%_18%,rgba(37,72,48,0.3),transparent_32%),radial-gradient(ellipse_at_83%_20%,rgba(186,205,197,0.2),transparent_35%),linear-gradient(180deg,transparent_55%,rgba(35,49,39,0.25))] before:content-[''] bg-[linear-gradient(135deg,rgba(27,49,35,0.55),rgba(44,63,51,0.62)),url('/assets/login-background.jpg')] bg-cover bg-center bg-no-repeat max-[420px]:px-[14px] max-[420px]:py-5">
      <section className="w-[min(100%,364px)] rounded-[21px] border border-white/90 bg-[#c5df78] p-6 shadow-[0_12px_28px_rgba(28,43,21,0.25)] max-[420px]:px-5 max-[420px]:py-[22px]" aria-labelledby="login-title">
        <header className="flex flex-col items-center text-center">
          <span className="inline-flex min-h-4 items-center gap-[5px] rounded-full bg-[#d9eea0] px-[11px] py-[3px] text-[8px] font-medium leading-[1.2] text-[#4b6515]">
            <span className="size-[6px] rounded-full bg-[#4b6515]" aria-hidden="true" />
            Sistem Manajemen Pasar &amp; Marketplace
          </span>
          <h1 className="mt-[5px] text-base font-semibold leading-[1.35] text-white [text-shadow:0_1px_2px_rgba(35,55,14,0.55)]" id="login-title">Pasar Oro-Oro Dowo</h1>
          <p className="mt-[3px] text-[9px] italic leading-[1.4] text-[#55652e]">Malang</p>
        </header>

        <div className="mt-3 flex items-start gap-[9px] rounded-[13px] bg-[#4b6515] px-[11px] py-[14px]">
          <span className="mt-px grid size-[25px] shrink-0 place-items-center rounded-lg bg-[#fbbf24] text-xs text-white" aria-hidden="true">
            <i className="fa-solid fa-comments" />
          </span>
          <div>
            <h2 className="mb-[3px] text-[13px] font-medium leading-[1.35] text-[#ffc21b]">Selamat Datang, Admin 👋</h2>
            <p className="m-0 max-w-[240px] text-[9px] leading-[1.45] text-white">
              Silakan masukkan kredensial akun untuk mengakses panel operasional
              toko, promo, dan pedagang terdaftar.
            </p>
          </div>
        </div>

        <form className="mt-[15px] grid gap-[11px]" onSubmit={handleSubmit}>
          <div className="min-w-0">
            <label className="block text-[9px] font-medium leading-[1.4] text-[#302b1e]" htmlFor="admin-username">Nama Pengguna / Email Admin</label>
            <div className="mt-[5px] flex h-[34px] items-center gap-[9px] rounded-[10px] border border-[rgba(75,101,21,0.07)] bg-[#4b6515] px-[11px] shadow-[0_1px_2px_rgba(75,101,21,0.04)] transition-[border-color,box-shadow] duration-150 focus-within:border-[#8cae4e] focus-within:shadow-[0_0_0_3px_rgba(194,220,128,0.28)]">
              <i className="fa-regular fa-user shrink-0 text-[11px] text-[#eef5dc]" aria-hidden="true" />
              <input
                className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[10px] [font-family:inherit] text-white outline-none placeholder:text-white/75 placeholder:opacity-100"
                id="admin-username"
                type="email"
                autoComplete="username"
                placeholder="admin.utama@pasaroro.id"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2">
              <label className="block text-[9px] font-medium leading-[1.4] text-[#302b1e]" htmlFor="admin-password">Kata Sandi</label>
              <button
                className="cursor-pointer p-0 text-[8px] text-[#4b6515] underline decoration-1 underline-offset-2 [font-family:inherit] hover:text-[#34490f] focus-visible:outline-2 focus-visible:outline-[#4b6515] focus-visible:outline-offset-[3px]"
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
                className="h-full min-w-0 w-full border-0 bg-transparent p-0 text-[10px] [font-family:inherit] text-white outline-none placeholder:text-white/75 placeholder:opacity-100"
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="grid h-[26px] w-[22px] shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[#eef5dc] hover:text-[#4b6515] focus-visible:outline-2 focus-visible:outline-[#4b6515] focus-visible:outline-offset-[3px]"
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
              <p className="mt-[5px] mb-0 text-[9px] leading-[1.4] text-[#4b6515]" role="status">
                {forgotMessage}
              </p>
            )}
          </div>

          {authMessage && (
            <p className="m-0 text-[9px] leading-[1.45] text-[#8c302b]" role="alert">
              {authMessage}
            </p>
          )}

          <button className="mt-px flex min-h-[34px] w-full cursor-pointer items-center justify-center gap-[5px] rounded-[10px] border-0 bg-[#fbbf24] text-[10px] font-medium text-white [font-family:inherit] shadow-[0_5px_10px_rgba(182,135,16,0.22)] transition-[background-color,box-shadow,transform] duration-150 hover:-translate-y-px hover:bg-[#f4b313] hover:shadow-[0_7px_14px_rgba(182,135,16,0.28)] focus-visible:outline-2 focus-visible:outline-[#4b6515] focus-visible:outline-offset-[3px]">
            {isSubmitting ? "Memeriksa akun..." : "Masuk ke Dashboard"} <span aria-hidden="true">→</span>
          </button>
        </form>
      </section>
    </main>
  );
}

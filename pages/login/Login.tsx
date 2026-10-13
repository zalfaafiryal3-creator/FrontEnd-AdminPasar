import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDemoAuth } from "../../auth/DemoAuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login } = useDemoAuth();
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
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthMessage("");
    setIsSubmitting(true);

    try {
      if (!await login(username, password)) {
        setAuthMessage("Email dan kata sandi wajib diisi.");
        return;
      }

      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(from && from !== "/login" ? from : "/dashboard", { replace: true });
    } catch {
      setAuthMessage("Login demo gagal memproses akun. Coba lagi pada tab browser yang sama.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <header className="login-brand">
          <span className="login-badge">
            <span className="login-badge-dot" aria-hidden="true" />
            Sistem Manajemen Pasar &amp; Marketplace
          </span>
          <h1 id="login-title">Pasar Oro-Oro Dowo</h1>
          <p className="login-location">Malang</p>
        </header>

        <div className="login-welcome">
          <span className="welcome-icon" aria-hidden="true">
            <i className="fa-solid fa-comments" />
          </span>
          <div className="welcome-copy">
            <h2>Selamat Datang, Admin 👋</h2>
            <p>
              Silakan masukkan kredensial akun untuk mengakses panel operasional
              toko, promo, dan pedagang terdaftar.
            </p>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="admin-username">Nama Pengguna / Email Admin</label>
            <div className="login-input-wrap">
              <i className="fa-regular fa-user login-input-icon" aria-hidden="true" />
              <input
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

          <div className="login-field">
            <div className="login-password-heading">
              <label htmlFor="admin-password">Kata Sandi</label>
              <button
                className="forgot-password"
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
            <div className="login-input-wrap">
              <i className="fa-solid fa-lock login-input-icon" aria-hidden="true" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                className="password-toggle"
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
              <p className="forgot-message" role="status">
                {forgotMessage}
              </p>
            )}
          </div>

          {authMessage && (
            <p className="login-auth-message" role="alert">
              {authMessage}
            </p>
          )}

          <button className="login-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Memeriksa akun..." : "Masuk ke Dashboard"} <span aria-hidden="true">→</span>
          </button>
        </form>
      </section>
    </main>
  );
}

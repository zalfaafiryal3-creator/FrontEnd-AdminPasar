import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  useEffect(() => {
    document.title = "Login Admin - Pasar Oro-Oro Dowo";
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/dashboard");
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
                type="text"
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
                placeholder="OroOroDowo#2024"
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

          <button className="login-submit" type="submit">
            Masuk ke Dashboard <span aria-hidden="true">→</span>
          </button>
        </form>
      </section>
    </main>
  );
}

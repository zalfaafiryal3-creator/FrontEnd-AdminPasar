import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDemoAuth } from "../../auth/DemoAuthContext";
import "../login/Login.css";
import "./Register.css";

type RegistrationErrors = {
  username?: string;
  password?: string;
  email?: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { register } = useDemoAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Registrasi Admin - Pasar Oro-Oro Dowo";
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: RegistrationErrors = {};
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUsername) {
      nextErrors.username = "Nama pengguna wajib diisi.";
    }

    if (!password) {
      nextErrors.password = "Kata sandi wajib diisi.";
    } else if (password.length < 8) {
      nextErrors.password = "Kata sandi minimal 8 karakter.";
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Email tidak valid.";
    }

    setErrors(nextErrors);
    setRegistrationMessage("");
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const registrationError = await register({
        username: trimmedUsername,
        email: trimmedEmail,
        password,
      });
      if (registrationError) {
        setRegistrationMessage(registrationError);
        return;
      }

      navigate("/login", {
        replace: true,
        state: { registeredUsername: trimmedUsername },
      });
    } catch {
      setRegistrationMessage("Registrasi demo gagal menyimpan sesi browser. Coba lagi pada tab yang sama.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearFieldError(field: keyof RegistrationErrors) {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setRegistrationMessage("");
  }

  return (
    <main className="login-page">
      <section className="login-card register-card" aria-labelledby="register-title">
        <header className="login-brand">
          <span className="login-badge">
            <span className="login-badge-dot" aria-hidden="true" />
            Sistem Manajemen Pasar &amp; Marketplace
          </span>
          <h1 id="register-title">Pasar Oro-Oro Dowo</h1>
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

        <p className="auth-demo-notice" role="note">
          Mode demo: akun hanya tersimpan sementara di tab browser ini. Jangan gunakan kata sandi asli.
        </p>

        <form className="login-form register-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="register-username">Nama Pengguna</label>
            <div className={`login-input-wrap${errors.username ? " has-error" : ""}`}>
              <i className="fa-regular fa-user login-input-icon" aria-hidden="true" />
              <input
                id="register-username"
                type="text"
                autoComplete="username"
                placeholder="admin.utama@pasaroro.id"
                value={username}
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? "register-username-error" : undefined}
                onChange={(event) => {
                  setUsername(event.target.value);
                  clearFieldError("username");
                }}
              />
            </div>
            {errors.username && (
              <p className="register-field-error" id="register-username-error">
                {errors.username}
              </p>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="register-password">Kata Sandi</label>
            <div className={`login-input-wrap${errors.password ? " has-error" : ""}`}>
              <i className="fa-solid fa-lock login-input-icon" aria-hidden="true" />
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="OroOroDowo#2024"
                value={password}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "register-password-error" : undefined}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearFieldError("password");
                }}
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
            {errors.password && (
              <p className="register-field-error" id="register-password-error">
                {errors.password}
              </p>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="register-email">Email</label>
            <div className={`login-input-wrap${errors.email ? " has-error" : ""}`}>
              <i className="fa-regular fa-envelope login-input-icon" aria-hidden="true" />
              <input
                id="register-email"
                type="email"
                autoComplete="email"
                placeholder="pasar123@gmail.com"
                value={email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "register-email-error" : undefined}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearFieldError("email");
                }}
              />
            </div>
            {errors.email && (
              <p className="register-field-error" id="register-email-error">
                {errors.email}
              </p>
            )}
          </div>

          {registrationMessage && (
            <p className="register-status" role="alert">
              {registrationMessage}
            </p>
          )}

          <button className="login-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Membuat akun..." : "Daftar Sekarang"} <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="register-login-link">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </section>
    </main>
  );
}

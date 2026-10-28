// Aturan validasi form login dan register.
// Aturan password SAMA dengan backend (src/lib/validatePassword.ts).
// Validasi di browser hanya untuk kenyamanan; yang menentukan tetap backend.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return "Email wajib diisi.";
  if (value.length > 254 || !EMAIL_PATTERN.test(value)) return "Format email tidak valid.";
  return null;
}

export function validatePasswordRules(password: string): string[] {
  if (!password) return ["Kata sandi wajib diisi."];

  const errors: string[] = [];
  if (password.length < 8) errors.push("Kata sandi minimal 8 karakter.");
  if (password.length > 72) errors.push("Kata sandi maksimal 72 karakter.");
  if (!/[A-Z]/.test(password)) errors.push("Kata sandi harus mengandung huruf besar.");
  if (!/[a-z]/.test(password)) errors.push("Kata sandi harus mengandung huruf kecil.");
  if (!/[0-9]/.test(password)) errors.push("Kata sandi harus mengandung angka.");
  return errors;
}

// Mengembalikan pesan error, atau null kalau valid
export function validateLogin(email: string, password: string): string | null {
  if (!email.trim() || !password) return "Email dan kata sandi wajib diisi.";
  return validateEmail(email);
}

// Mengembalikan daftar pesan error. Daftar kosong = valid
export function validateRegister(input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}): string[] {
  const errors: string[] = [];

  const name = input.name.trim();
  if (name.length < 2 || name.length > 60) errors.push("Nama harus 2 sampai 60 karakter.");

  const emailError = validateEmail(input.email);
  if (emailError) errors.push(emailError);

  errors.push(...validatePasswordRules(input.password));

  if (input.password !== input.confirmPassword) {
    errors.push("Konfirmasi kata sandi tidak cocok.");
  }
  return errors;
}
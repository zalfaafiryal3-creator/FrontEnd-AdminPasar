// Tipe data pengguna dan respons auth, supaya frontend tahu bentuk data dari backend

export type UserRole = "admin" | "seller";

// Pengguna yang sedang login.
// "username" berisi field "name" dari backend (nama tetap "username" agar halaman lama tidak perlu diubah).
export type AuthUser = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
};

// Bentuk pengguna persis seperti balasan backend
export type ApiUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

// Balasan POST /api/auth/login dan /api/auth/register
export type ApiAuthResponse = {
  user: ApiUser;
  token?: string; // tidak dipakai: login disimpan backend di cookie httpOnly
};

// Hasil login/register yang dikembalikan ke form
export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string };

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
// Fungsi untuk mengirim request ke backend.
// Login disimpan backend sebagai cookie httpOnly, jadi cukup credentials: "include".

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(message: string, status: number, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const hasBody = options.body !== undefined;

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers: hasBody ? { "Content-Type": "application/json" } : undefined,
      body: hasBody ? JSON.stringify(options.body) : undefined,
      credentials: "include", // kirim dan terima cookie login
    });
  } catch {
    throw new ApiError("Tidak dapat terhubung ke server. Pastikan backend sudah menyala.", 0);
  }

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    // balasan bukan JSON
  }

  if (!response.ok) {
    const body = (data ?? {}) as { error?: unknown; errors?: unknown };
    const message =
      typeof body.error === "string" ? body.error : "Terjadi kesalahan. Silakan coba lagi.";
    const errors = Array.isArray(body.errors)
      ? body.errors.filter((item): item is string => typeof item === "string")
      : [];
    throw new ApiError(message, response.status, errors);
  }

  return data as T;
}
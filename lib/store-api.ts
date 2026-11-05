import { apiRequest } from "./api";

export type StoreStatus = "buka" | "tutup" | "menunggu_verifikasi";

export type StoreCategory = {
  id: number;
  name: string;
  storeCount: number;
};

export type StoreProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  photoUrl: string | null;
};

export type Store = {
  id: number;
  slug: string;
  name: string;
  owner: string;
  category: string;
  categoryId: number;
  zone: string;
  status: StoreStatus;
  openTime: string;
  closeTime: string;
  operatingHours: string;
  establishedYear: number | null;
  phone: string;
  email: string;
  description: string;
  bannerUrl: string | null;
  logoUrl: string | null;
  sellerId: number | null;
  rating: number;
  reviewCount: number;
  productCount: number;
  products?: StoreProduct[];
};

export type StoreProductInput = {
  name: string;
  price: number;
  description: string;
  photoUrl: string | null;
};

export type StoreCreateRequest = {
  name: string;
  ownerName?: string;
  categoryId: number;
  zone?: string;
  status?: StoreStatus;
  openTime?: string;
  closeTime?: string;
  establishedYear?: number | null;
  phone?: string;
  email?: string;
  description?: string;
  bannerUrl?: string | null;
  logoUrl?: string | null;
  sellerId?: number | null;
  products?: StoreProductInput[];
};

export type StoreUpdateRequest = Partial<StoreCreateRequest>;

export type StoreFormProduct = {
  nama: string;
  harga: string;
  deskripsi: string;
  foto: string | null;
};

export type StoreFormValues = {
  store: string;
  owner: string;
  category: string;
  zone: string;
  status: "Buka" | "Tutup" | "Menunggu Verifikasi";
  operatingHours: string;
  establishedYear: string;
  phone: string;
  email?: string;
  description: string;
  bannerImage: string | null;
  logoImage: string | null;
  products: StoreFormProduct[];
};

function assertPositiveId(id: number, label: string): void {
  if (!Number.isSafeInteger(id) || id < 1 || id > 2_147_483_647) {
    throw new Error(`${label} harus berupa ID angka positif yang valid.`);
  }
}

function toOptionalUrl(value: string | null, label: string): string | null {
  if (value === null || value.trim() === "") return null;

  const url = value.trim();
  if (url.startsWith("data:")) {
    throw new Error(`${label}: foto yang diunggah belum dapat disimpan. Gunakan URL gambar.`);
  }
  if (url.startsWith("/")) {
    if (url.startsWith("//")) {
      throw new Error(`${label} tidak boleh berupa alamat relatif lintas domain.`);
    }
    return url;
  }

  try {
    const parsedUrl = new URL(url);
    if (
      (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") &&
      parsedUrl.hostname &&
      !parsedUrl.username &&
      !parsedUrl.password
    ) {
      return url;
    }
  } catch {
    // URL yang tidak valid akan ditolak di bawah.
  }

  throw new Error(`${label} harus berupa URL HTTP/HTTPS atau alamat lokal.`);
}

function categoryIdForName(categoryName: string, categories: StoreCategory[]): number {
  const category = categories.find(
    (item) => item.name.trim().toLocaleLowerCase("id") === categoryName.trim().toLocaleLowerCase("id"),
  );
  if (!category) {
    throw new Error(`Kategori "${categoryName}" tidak ditemukan di backend.`);
  }
  assertPositiveId(category.id, "Kategori");
  return category.id;
}

function parseOperatingHours(value: string): { openTime: string; closeTime: string } {
  const match = /^([01]\d|2[0-3]):[0-5]\d\s*-\s*([01]\d|2[0-3]):[0-5]\d$/.exec(value.trim());
  if (!match) {
    throw new Error("Jam operasional harus berformat HH:MM - HH:MM.");
  }
  return { openTime: match[0].slice(0, 5), closeTime: match[0].slice(-5) };
}

function parseEstablishedYear(value: string): number | null {
  if (!value.trim()) return null;
  if (!/^\d{4}$/.test(value.trim())) {
    throw new Error("Tahun berdiri harus berupa angka 4 digit.");
  }

  const year = Number(value.trim());
  if (year < 1800 || year > new Date().getFullYear()) {
    throw new Error("Tahun berdiri tidak valid.");
  }
  return year;
}

function parseProductPrice(value: string): number {
  const normalized = value.trim().replace(/^Rp\s*/i, "");
  let price: number;
  if (/^\d+$/.test(normalized)) {
    price = Number(normalized);
  } else if (/^\d{1,3}(?:\.\d{3})+$/.test(normalized)) {
    price = Number(normalized.replace(/\./g, ""));
  } else {
    throw new Error("Harga produk harus berupa bilangan bulat Rupiah.");
  }

  if (!Number.isSafeInteger(price) || price < 0 || price > 2_147_483_647) {
    throw new Error("Harga produk di luar batas yang didukung backend.");
  }
  return price;
}

function toProductRequest(product: StoreFormProduct, index: number): StoreProductInput {
  const name = product.nama.trim();
  if (!name) {
    throw new Error(`Nama produk ke-${index + 1} wajib diisi.`);
  }
  if (name.length > 80) {
    throw new Error(`Nama produk ke-${index + 1} maksimal 80 karakter.`);
  }

  const description = product.deskripsi.trim();
  if (description.length > 300) {
    throw new Error(`Deskripsi produk ke-${index + 1} maksimal 300 karakter.`);
  }

  return {
    name,
    price: parseProductPrice(product.harga),
    description,
    photoUrl: toOptionalUrl(product.foto, `Foto produk ke-${index + 1}`),
  };
}

export function mapStoreFormToCreateRequest(
  form: StoreFormValues,
  categories: StoreCategory[],
): StoreCreateRequest {
  const name = form.store.trim();
  if (name.length < 2 || name.length > 80) {
    throw new Error("Nama toko harus 2 sampai 80 karakter.");
  }

  const ownerName = form.owner.trim();
  if (ownerName.length > 80) throw new Error("Nama pemilik maksimal 80 karakter.");
  const zone = form.zone.trim();
  if (zone.length > 60) throw new Error("Zona maksimal 60 karakter.");
  const description = form.description.trim();
  if (description.length > 1000) throw new Error("Deskripsi maksimal 1000 karakter.");

  const email = (form.email ?? "").trim().toLowerCase();
  if (email.length > 254 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    throw new Error("Format email toko tidak valid.");
  }

  const statusByLabel: Record<StoreFormValues["status"], StoreStatus> = {
    Buka: "buka",
    Tutup: "tutup",
    "Menunggu Verifikasi": "menunggu_verifikasi",
  };
  const { openTime, closeTime } = parseOperatingHours(form.operatingHours);

  return {
    name,
    ownerName,
    categoryId: categoryIdForName(form.category, categories),
    zone,
    status: statusByLabel[form.status],
    openTime,
    closeTime,
    establishedYear: parseEstablishedYear(form.establishedYear),
    phone: form.phone.trim(),
    email,
    description,
    bannerUrl: toOptionalUrl(form.bannerImage, "Banner toko"),
    logoUrl: toOptionalUrl(form.logoImage, "Logo toko"),
    products: form.products
      .filter((product) => product.nama.trim() !== "")
      .map(toProductRequest),
  };
}

export function mapStoreFormToUpdateRequest(
  form: StoreFormValues,
  categories: StoreCategory[],
  options: { includeStatus?: boolean } = {},
): StoreUpdateRequest {
  const request = mapStoreFormToCreateRequest(form, categories);
  if (!options.includeStatus) delete request.status;
  return request;
}

export function getStoreCategories(): Promise<StoreCategory[]> {
  return apiRequest<StoreCategory[]>("/api/categories");
}

export function getManagedStores(): Promise<Store[]> {
  return apiRequest<Store[]>("/api/stores/manage");
}

export function createStore(request: StoreCreateRequest): Promise<Store> {
  assertPositiveId(request.categoryId, "Kategori");
  return apiRequest<Store>("/api/stores", { method: "POST", body: request });
}

export function updateStore(id: number, request: StoreUpdateRequest): Promise<Store> {
  assertPositiveId(id, "Toko");
  if (request.categoryId !== undefined) assertPositiveId(request.categoryId, "Kategori");
  return apiRequest<Store>(`/api/stores/${id}`, { method: "PUT", body: request });
}

export function deleteStore(id: number): Promise<{ message: string }> {
  assertPositiveId(id, "Toko");
  return apiRequest<{ message: string }>(`/api/stores/${id}`, { method: "DELETE" });
}

export type AdminUserRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  type: string;
  activity: string;
  browser: string;
};

export type AdminPromoRecord = {
  id: string;
  store: string;
  owner: string;
  category: string;
  discount: string;
  period: string;
  requirements: string;
  quota: string;
  status: string;
  bannerImage?: string;
};

export type AdminSellerRecord = {
  id: string;
  name: string;
  shop: string;
  block: string;
  status: string;
  phone: string;
  email: string;
  type: string;
};

export const initialUserRecords: AdminUserRecord[] = [
  { id: "user-default-mifta-annisa", name: "Mifta Annisa", email: "miftannisa@gmail.com", phone: "+62 812-3456-7890", status: "Aktif", type: "Pelanggan", activity: "2 menit lalu", browser: "Web Browser • Klojen, Malang" },
  { id: "user-default-serli", name: "Serli Maharani", email: "serli.m@gmail.com", phone: "+62 813-9811-4450", status: "Aktif", type: "Pelanggan", activity: "15 menit lalu", browser: "Web Browser • Lowokwaru" },
  { id: "user-default-firyal", name: "Firyal Zalfa", email: "firyal.z@gmail.com", phone: "+62 821-7734-1199", status: "Aktif", type: "Pelanggan", activity: "1 jam lalu", browser: "Web Browser • Sukun, Malang" },
  { id: "user-default-naila", name: "Naila", email: "Nafisha_Naila@gmail.com", phone: "+62 812-3341-9011", status: "Aktif", type: "Pembeli", activity: "Kemarin, 14.20", browser: "Browser • Blimbing" },
  { id: "user-default-zee", name: "Zee", email: "ZEE@gmail.com", phone: "+62 856-3222-1134", status: "Aktif", type: "Pelanggan", activity: "3 hari lalu", browser: "Web Browser • Dau, Malang" },
];

export const initialPromoRecords: AdminPromoRecord[] = [
  { id: "promo-default-lumpur-kentang-v2", store: "Tahu Bakso Cempur", owner: "Pak Haryono", category: "Makanan", discount: "Diskon Tunai 10%", period: "1 Sep - 30 Okt 2026", requirements: "Min. pembelian 10K", quota: "180 / 200", status: "Sedang Berlangsung" },
  { id: "promo-default-bakery", store: "Bakery & Cake Corner", owner: "Bu Ratna", category: "Makanan", discount: "Diskon Cuci 30%", period: "1 Okt - 31 Okt 2026", requirements: "Pembelian 2 item", quota: "0 / 150", status: "Akan Datang" },
  { id: "promo-default-warung", store: "Warung Bu As", owner: "Bu Asmawati", category: "Sembako", discount: "Promo Ganda", period: "1 Sep - 8 Minggu", requirements: "Pelanggan langganan", quota: "95 / 120", status: "Sedang Berlangsung" },
  { id: "promo-default-mie", store: "Mie Ayam Oro-Oro Dowo", owner: "Cak Man", category: "Makanan", discount: "Promo Mie Ayam", period: "Selasa, 24 Okt 2026", requirements: "Khusus hari Selasa", quota: "12 / 150", status: "Hampir Habis" },
];

export function isActivePromoStatus(status: string): boolean {
  return status === "Sedang Berlangsung"
    || status === "Hampir Habis"
    || status === "Setiap Akhir Pekan"
    || status === "Hari Pasaran Khusus";
}

export const initialSellerRecords: AdminSellerRecord[] = [
  { id: "seller-1", name: "Budi Santoso", shop: "Toko Tahu & Sayur Barokah", block: "Kios A-12", status: "Lapak Buka", phone: "+62 812-3456-7890", email: "budisantoso@gmail.com", type: "Zona Kuliner" },
  { id: "seller-2", name: "Joko Prasetyo", shop: "Los Daging Segar Pak Joko", block: "Lapak B-04", status: "Lapak Buka", phone: "+62 813-8900-7723", email: "jokoprasetyo@gmail.com", type: "Zona Daging" },
  { id: "seller-3", name: "Sri Wahyuni", shop: "Kue Tradisional & Jajanan Bu Sri", block: "Kios B-08", status: "Lapak Buka", phone: "+62 821-4567-9011", email: "sri.wahyuni@gmail.com", type: "Zona Kuliner" },
  { id: "seller-4", name: "Siti Aminah", shop: "Bumbu Dapur & Rempah Alam", block: "Los B-02", status: "Tutup Sementara", phone: "+62 857-9012-3456", email: "siti.aminah@gmail.com", type: "Zona Bahan Pokok" },
];

export function readAdminRecords<T extends { id: string }>(
  storageKey: string,
  initialRecords: T[],
  deletedStorageKey?: string,
): T[] {
  if (typeof window === "undefined") return initialRecords;

  const savedRecords = readStoredArray<T>(storageKey);
  const deletedIds = new Set(deletedStorageKey ? readStoredArray<string>(deletedStorageKey) : []);
  const savedById = new Map(
    savedRecords
      .filter((record) => record && typeof record.id === "string")
      .map((record) => [record.id, record]),
  );
  const initialIds = new Set(initialRecords.map((record) => record.id));
  const initial = initialRecords
    .filter((record) => !deletedIds.has(record.id))
    .map((record) => ({ ...record, ...savedById.get(record.id) }));
  const extras = [...savedById.values()].filter(
    (record) => !initialIds.has(record.id) && !deletedIds.has(record.id),
  );

  return [...initial, ...extras];
}

function readStoredArray<T>(key: string): T[] {
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];

  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`Data "${key}" tidak memiliki format daftar yang valid.`);
  }
  return parsed as T[];
}

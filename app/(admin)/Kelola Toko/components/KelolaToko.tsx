"use client";

import { useMemo, useState } from "react";
import TambahTokoModal, { type TokoData } from "../../../../components/TambahTokoModal";

type Store = {
  id: string;
  store: string;
  handle: string;
  owner: string;
  phone: string;
  email: string;
  category: string;
  rating: string;
  transactions: string;
  zone: string;
  status: "Aktif / Terverifikasi" | "Menunggu Verifikasi";
};

const initialStores: Store[] = [
  { id: "store-default-lumpur-kentang", store: "Kue Lumpur Kentang Bu Sri", handle: "@lumpurkentang_sri", owner: "Budi Santoso", email: "budisantoso@gmail.com", phone: "+62 812-3456-7890", category: "Makanan & Jajanan", rating: "4.8", transactions: "1.240", zone: "Blok A-04", status: "Aktif / Terverifikasi" },
  { id: "store-default-klepon", store: "Klepon Ku", handle: "@kleponku_malang", owner: "Siti Aminah", email: "siti.aminah@gmail.com", phone: "+62 821-2345-6789", category: "Makanan & Jajanan", rating: "4.9", transactions: "3.890", zone: "Blok A-12", status: "Aktif / Terverifikasi" },
  { id: "store-default-sayur", store: "Kios Sayur Segar Bu Sri", handle: "@sayurbu_sri", owner: "Sri Wahyuni", email: "sri.wahyuni@gmail.com", phone: "+62 857-1234-9092", category: "Sayuran", rating: "4.7", transactions: "890", zone: "Blok B-08", status: "Aktif / Terverifikasi" },
  { id: "store-default-ayam", store: "Ayam Potong Pak Slamet", handle: "@ayampakslamet", owner: "Slamet Riyadi", email: "slamet.riyadi@gmail.com", phone: "+62 812-5555-2012", category: "Daging & Ikan", rating: "4.6", transactions: "712", zone: "Blok C-02", status: "Aktif / Terverifikasi" },
  { id: "store-default-bakso", store: "Bakso Goreng Bangkit", handle: "@baksogoreng_org", owner: "Joko Prasetyo", email: "joko.prasetyo@gmail.com", phone: "+62 822-7711-4050", category: "Makanan & Jajanan", rating: "4.9", transactions: "2.410", zone: "Blok A-10", status: "Aktif / Terverifikasi" },
  { id: "store-default-jamu", store: "Jamu Tradisional Bu Darto", handle: "@jamubudarto", owner: "Darto Widoyono", email: "darto.widoyono@gmail.com", phone: "+62 812-5555-5544", category: "Makanan & Jajanan", rating: "4.8", transactions: "640", zone: "Blok B-15", status: "Menunggu Verifikasi" },
];

const categories = [...new Set(initialStores.map((store) => store.category))];
const inputClass =
  "h-9 min-w-0 rounded-lg border border-[#dfe6cc] bg-white px-3 text-xs text-[#594045] outline-none focus-visible:ring-2 focus-visible:ring-[#8cae4e]";

export default function KelolaToko() {
  const [storeList, setStoreList] = useState<Store[]>(initialStores);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleStores = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id");
    return storeList.filter((store) => {
      const matchesSearch =
        `${store.store} ${store.handle} ${store.owner} ${store.email} ${store.phone} ${store.zone}`
          .toLocaleLowerCase("id")
          .includes(query);
      return (
        matchesSearch &&
        (!categoryFilter || store.category === categoryFilter) &&
        (!statusFilter || store.status === statusFilter)
      );
    });
  }, [search, categoryFilter, statusFilter]);

  return (
    <main className="min-h-screen bg-[#f5f7ef] px-4 py-5 text-[#594045] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#74666a]">
          Admin Panel <span aria-hidden="true">›</span> Kelola Toko
        </p>
        <header className="mt-2 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Kelola Toko Pasar Oro-Oro Dowo</h1>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#74666a] sm:text-sm">
              Manajemen operasional, sertifikasi digital, dan kurasi direktori pedagang Pasar Oro-Oro Dowo Malang.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-[#c2dc80] px-3 text-xs font-semibold text-[#3b501d] transition hover:bg-[#b5d36b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]"
          >
            <i className="fa-solid fa-plus" aria-hidden="true" /> Tambah Toko Baru
          </button>
        </header>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan toko">
          {[
            { label: "TOTAL TOKO", value: "251", detail: "251 Aktif • bulan ini", icon: "fa-store" },
            { label: "MAKANAN & KULINER", value: "36", detail: "46% dari keseluruhan pasar", icon: "fa-utensils" },
            { label: "TOTAL PENGGUNA", value: "28", detail: "36% komoditas pangan basah", icon: "fa-users" },
            { label: "TOTAL TRANSAKSI", value: "28", detail: "36% transaksi bulan ini", icon: "fa-wallet" },
          ].map((summary) => (
            <article key={summary.label} className="flex items-center justify-between gap-3 rounded-xl border border-[#e7ebdd] bg-white p-4 shadow-sm">
              <div>
                <h2 className="text-[10px] font-semibold tracking-wide text-[#74666a]">{summary.label}</h2>
                <p className="mt-1 text-2xl font-bold leading-none">{summary.value}</p>
                <p className="mt-1 text-[10px] text-[#74666a]">{summary.detail}</p>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eef4de] text-[#4b6515]">
                <i className={`fa-solid ${summary.icon}`} aria-hidden="true" />
              </span>
            </article>
          ))}
        </section>

        <section className="mt-5 overflow-hidden rounded-xl border border-[#e7ebdd] bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#edf0e9] p-3">
            <label className="relative min-w-[200px] flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#74666a]" aria-hidden="true" />
              <input
                className={`${inputClass} w-full pl-8`}
                type="search"
                placeholder="Cari nama toko, pemilik, atau blok..."
                aria-label="Cari toko"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <select className={inputClass} aria-label="Filter kategori" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="">Semua Kategori</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <select className={inputClass} aria-label="Filter status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="">Semua Status</option>
              <option>Aktif / Terverifikasi</option>
              <option>Menunggu Verifikasi</option>
            </select>
            <span className="ml-auto text-[10px] text-[#74666a]">{visibleStores.length} toko ditampilkan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead className="bg-[#eef4de] text-[9px] font-semibold text-[#594045]">
                <tr>
                  {["INFORMASI TOKO", "PEMILIK & KONTAK", "KATEGORI", "RATING & TRANSAKSI", "STATUS TOKO", "ZONA"].map((heading) => (
                    <th className="px-3 py-3" key={heading}>{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleStores.length ? visibleStores.map((store) => (
                  <tr className="border-t border-[#edf0e9] text-xs" key={store.id}>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f8e49f] text-[#4b6515]">
                          <i className="fa-solid fa-basket-shopping" aria-hidden="true" />
                        </span>
                        <span>
                          <strong className="block font-semibold">{store.store}</strong>
                          <small className="mt-0.5 block text-[10px] text-[#74666a]">{store.handle} · {store.zone}</small>
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <strong className="block font-medium">{store.owner}</strong>
                      <small className="mt-0.5 block text-[10px] text-[#74666a]">{store.phone}</small>
                      <small className="block text-[10px] text-[#74666a]">{store.email}</small>
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded-lg bg-[#d9eaae] px-2 py-1 text-[10px] text-[#315e20]">{store.category}</span>
                    </td>
                    <td className="px-3 py-3">
                      <strong className="block text-sm text-[#d99300]">★ {store.rating}</strong>
                      <small className="text-[10px] text-[#74666a]">{store.transactions} terjual</small>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-1 text-[10px] ${store.status === "Aktif / Terverifikasi" ? "bg-[#d9eaae] text-[#315e20]" : "bg-[#fff1cf] text-[#805a10]"}`}>
                        {store.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[10px]">{store.zone}</td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-3 py-8 text-center text-xs text-[#74666a]" colSpan={6}>
                      Toko tidak ditemukan. Ubah kata pencarian atau filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <TambahTokoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data: TokoData) => {
          const newStore: Store = {
            id: data.id || `store-${Date.now()}`,
            store: data.store,
            handle: data.handle || `@${data.store.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
            owner: data.owner,
            email: data.email || "",
            phone: data.phone,
            category: data.category,
            rating: data.rating || "5.0",
            transactions: data.transactions || "0",
            zone: data.zone,
            status: data.status === "Buka" ? "Aktif / Terverifikasi" : "Menunggu Verifikasi",
          };
          setStoreList((prev) => [newStore, ...prev]);
        }}
      />
    </main>
  );
}

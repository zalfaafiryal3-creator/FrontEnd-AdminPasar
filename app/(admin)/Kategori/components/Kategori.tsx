import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import AdminLayout from "../../../../components/AdminLayout";
import { createCategory } from "../../../../lib/admin-api";
import { ApiError } from "../../../../lib/api";
import {
  getManagedStores,
  getStoreCategories,
  type Store,
  type StoreCategory,
} from "../../../../lib/store-api";

type Menu = {
  id: string;
  category: string;
  item: string;
  details: string;
  icon: string;
  leaf?: boolean;
};

function iconForCategory(category: string): { icon: string; leaf?: boolean } {
  const lower = category.toLowerCase();
  if (lower.includes("sayur") || lower.includes("buah") || lower.includes("mainan") || lower.includes("baju")) {
    return { icon: "◉", leaf: true };
  }
  if (lower.includes("daging") || lower.includes("ikan")) {
    return { icon: "≋", leaf: true };
  }
  if (lower.includes("sembako") || lower.includes("perabot")) {
    return { icon: "◈" };
  }
  return { icon: "✣" };
}

function storeToMenu(store: Store): Menu {
  const { icon, leaf } = iconForCategory(store.category);
  const details = store.zone
    ? `${store.zone}${store.operatingHours ? ` • ${store.operatingHours}` : ""}`
    : store.description || store.category;
  return {
    id: String(store.id),
    category: store.category,
    item: store.name,
    details,
    icon,
    leaf,
  };
}

function CategoryCard({
  category,
  entries,
}: {
  category: string;
  entries: Menu[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ITEMS_PER_PAGE = 5;
  const slides = useMemo(() => {
    const list: Menu[][] = [];
    for (let i = 0; i < entries.length; i += ITEMS_PER_PAGE) {
      list.push(entries.slice(i, i + ITEMS_PER_PAGE));
    }
    return list.length ? list : [[]];
  }, [entries]);

  const activeSlide = Math.min(currentSlide, Math.max(0, slides.length - 1));
  const currentEntries = slides[activeSlide] || [];

  return (
    <section className="flex min-w-0 flex-col" key={category}>
      <h2 className="relative z-[1] mx-auto -mb-[3px] grid min-h-[30px] w-[min(100%,184px)] place-items-center rounded-xl bg-[#594045] px-2 py-[5px] text-center text-[11px] leading-[1.3] font-bold text-white shadow-sm">
        <span>{category}</span>
        <small className="text-[9px] font-medium opacity-80">{entries.length} Toko</small>
      </h2>

      <div className="flex h-[360px] min-w-0 flex-col rounded-[19px] border border-[rgba(194,220,128,0.82)] bg-[#e3efc2] px-3 pt-[34px] pb-3 shadow-[0_5px_14px_rgba(75,101,21,0.07)] max-[980px]:px-2 max-[760px]:h-auto max-[760px]:px-3 max-[760px]:pt-8 max-[760px]:pb-3">
        {/* Navigasi Slide Samping jika item lebih dari 5 */}
        {slides.length > 1 && (
          <div className="mb-2 flex items-center justify-between rounded-lg bg-white/60 px-2 py-1 text-[9px] font-semibold text-[#4b6515] shadow-xs">
            <button
              type="button"
              disabled={activeSlide === 0}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              className="flex h-5 w-5 items-center justify-center rounded bg-white text-[#4b6515] shadow-xs transition hover:bg-[#edf5d7] disabled:cursor-not-allowed disabled:opacity-30"
              title="Slide sebelumnya"
              aria-label="Slide sebelumnya"
            >
              <i className="fa-solid fa-chevron-left text-[8px]" />
            </button>
            <div className="flex items-center gap-1.5">
              <span>Slide {activeSlide + 1} / {slides.length}</span>
              <span className="flex gap-1">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeSlide ? "w-3 bg-[#4b6515]" : "w-1.5 bg-[#4b6515]/35 hover:bg-[#4b6515]/60"
                    }`}
                    title={`Ke slide ${idx + 1}`}
                    aria-label={`Ke slide ${idx + 1}`}
                  />
                ))}
              </span>
            </div>
            <button
              type="button"
              disabled={activeSlide === slides.length - 1}
              onClick={() => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1))}
              className="flex h-5 w-5 items-center justify-center rounded bg-white text-[#4b6515] shadow-xs transition hover:bg-[#edf5d7] disabled:cursor-not-allowed disabled:opacity-30"
              title="Slide berikutnya"
              aria-label="Slide berikutnya"
            >
              <i className="fa-solid fa-chevron-right text-[8px]" />
            </button>
          </div>
        )}

        {/* Daftar toko per slide (5 toko) */}
        <div className="flex-1 overflow-hidden">
          {currentEntries.map((menu) => (
            <div
              className="mb-[9px] flex min-w-0 items-center gap-2 rounded-[9px] p-1 text-[#594045] transition-colors duration-[140ms] hover:bg-[rgba(255,255,255,0.4)] max-[980px]:gap-[6px] max-[980px]:p-[3px] max-[760px]:mb-[8px] max-[760px]:gap-2 max-[760px]:p-1"
              data-menu-id={menu.id}
              key={menu.id}
            >
              <span
                className={`grid h-[31px] w-[31px] shrink-0 place-items-center rounded-[10px] bg-[#fbbf24] text-sm text-[#4b6515] shadow-[0_2px_4px_rgba(75,101,21,0.13)] max-[980px]:h-7 max-[980px]:w-7 max-[980px]:text-xs max-[760px]:h-[31px] max-[760px]:w-[31px] max-[760px]:text-sm ${
                  menu.leaf ? "bg-[#c2dc80]" : ""
                }`}
              >
                {menu.icon}
              </span>
              <span className="min-w-0 flex-1">
                <strong className="mb-0.5 block truncate text-[10px] leading-[1.35] text-[#594045] max-[980px]:text-[9px] max-[760px]:text-[10px]">
                  {menu.item}
                </strong>
                <small className="block truncate text-[8px] leading-[1.4] text-[#74666a] max-[980px]:text-[7px] max-[760px]:text-[8px]">
                  • {menu.details}
                </small>
              </span>
            </div>
          ))}
          {!currentEntries.length && (
            <p className="my-auto py-8 text-center text-[9px] text-[#74666a]">
              Belum ada toko di kategori ini.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Kategori() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua Kategori");
  const [sortOption, setSortOption] = useState("Urutkan: Toko Terbanyak");
  const [formError, setFormError] = useState("");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [catList, storeList] = await Promise.all([
        getStoreCategories(),
        getManagedStores(),
      ]);
      setCategories(catList);
      setMenus(storeList.map(storeToMenu));
    } catch {
      // Abaikan jika gagal memuat sementara
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(target)) {
        setCategoryMenuOpen(false);
      }
      if (sortMenuRef.current && !sortMenuRef.current.contains(target)) {
        setSortMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const categoryNames = useMemo(
    () => [...new Set([...categories.map((cat) => cat.name), ...menus.map((menu) => menu.category)])],
    [categories, menus],
  );
  const menuCounts = menus.reduce<Record<string, number>>((counts, menu) => {
    counts[menu.category] = (counts[menu.category] ?? 0) + 1;
    return counts;
  }, {});
  const dominantCategory = Object.entries(menuCounts).sort((a, b) => b[1] - a[1])[0];
  const dominantPercentage = menus.length && dominantCategory
    ? Math.round((dominantCategory[1] / menus.length) * 100)
    : 0;
  const occupancyPercentage = Math.min(100, Math.round((menus.length / 90) * 100));
  const groupedMenus = categoryNames.reduce<Record<string, Menu[]>>((groups, category) => {
    if (categoryFilter !== "Semua Kategori" && categoryFilter !== category) return groups;

    const query = search.trim().toLocaleLowerCase("id");
    const categoryMatches = category.toLocaleLowerCase("id").includes(query);
    const entries = menus.filter((menu) => menu.category === category
      && (categoryMatches || `${menu.item} ${menu.category} ${menu.details}`.toLocaleLowerCase("id").includes(query)));
    if (!query || categoryMatches || entries.length) groups[category] = categoryMatches ? menus.filter((menu) => menu.category === category) : entries;
    return groups;
  }, {});

  const sortedCategoryEntries = useMemo(() => {
    const entries = Object.entries(groupedMenus);
    if (sortOption === "Urutkan: A-Z") {
      return entries.sort((a, b) => a[0].localeCompare(b[0], "id"));
    }
    return entries.sort((a, b) => b[1].length - a[1].length);
  }, [groupedMenus, sortOption]);

  async function addCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const category = String(formData.get("category") || "").trim();
    setFormError("");

    if (!category) {
      setFormError("Nama kategori wajib diisi.");
      return;
    }
    if (categoryNames.some((name) => name.toLocaleLowerCase("id") === category.toLocaleLowerCase("id"))) {
      setFormError(`Kategori "${category}" sudah tersedia.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createCategory(category);
      setCategories((current) => [...current, created]);
      form.reset();
      dialogRef.current?.close();
    } catch (error) {
      setFormError(error instanceof ApiError ? error.message : "Gagal menyimpan kategori ke database.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AdminLayout activePage="categories" label="Admin Kategori">
        <main className="page-view active management-view category-management flex min-h-[calc(100vh-58px)] flex-col px-6 py-[17px] pb-[18px] text-[#594045] max-[760px]:px-4 max-[560px]:px-3 max-[390px]:px-2.5">
          <div className="mb-2 text-[9px] font-semibold tracking-[0.12em] text-[#74666a]">ADMIN PANEL &nbsp;›&nbsp; KATEGORISASI</div>
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4 [&_h1]:mb-1 [&_h1]:text-[21px] [&_h1]:font-bold [&_h1]:leading-[1.3] [&_h1]:text-[#594045] [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-[#74666a] max-[760px]:[&_h1]:text-[19px] max-[560px]:[&_h1]:text-[17px] max-[560px]:gap-2"><div><h1>Kelola Kategori Toko Pasar Oro-Oro Dowo</h1><p>Kelola klasifikasi struktur kategori, dan penataan lapak pedagang di kawasan Pasar Oro-Oro Dowo Malang demi penataan pasar tradisional bersih berstandar SNI.</p></div><button className="inline-flex min-h-9 items-center gap-[7px] rounded-[9px] bg-[#c2dc80] px-[13px] py-2 text-xs text-[#594045] shadow-[0_3px_7px_rgba(75,101,21,0.12)] transition-all hover:-translate-y-px hover:bg-[#b5d36b] hover:shadow-[0_5px_10px_rgba(75,101,21,0.16)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#4b6515] max-[560px]:ml-auto max-[560px]:min-h-8 max-[560px]:px-2.5 max-[560px]:py-[7px] max-[560px]:text-[10px]" type="button" onClick={() => { setFormError(""); dialogRef.current?.showModal(); }}><i className="fa-solid fa-plus"/> Tambah Kategori Baru</button></div>
          <section className="management-summary category-summary mb-4 grid grid-cols-4 gap-3 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1" aria-label="Ringkasan kategori">
            <article className="summary-card flex min-w-0 items-center justify-between rounded-2xl border border-[#c2dc80]/60 bg-[#edf5d7] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">TOTAL TOKO</span><strong className="text-xl">{menus.length}</strong><small className="text-[10px] text-[#74666a]">{menus.length} Aktif • bulan ini</small></div><i className="fa-solid fa-store text-lg text-[#4b6515]" /></article>
            <article className="summary-card amber flex min-w-0 items-center justify-between rounded-2xl border border-[#fbbf24]/40 bg-[#fff0c2] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">TOTAL KATEGORI</span><strong className="text-xl">{categoryNames.length} <small className="text-[10px] font-normal">kategori aktif</small></strong><small className="text-[10px] text-[#74666a]">Zonasi Standar Revitalisasi SNI</small></div><i className="fa-solid fa-shop text-lg text-[#4b6515]" /></article>
            <article className="summary-card flex min-w-0 items-center justify-between rounded-2xl border border-[#c2dc80]/60 bg-[#edf5d7] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">KATEGORI DOMINAN</span><strong className="summary-word text-xl">{dominantCategory?.[0] ?? "—"}</strong><small className="text-[10px] text-[#74666a]">({dominantPercentage}%) • {dominantCategory?.[1] ?? 0} Toko</small></div><i className="fa-solid fa-utensils text-lg text-[#4b6515]" /></article>
            <article className="summary-card amber flex min-w-0 items-center justify-between rounded-2xl border border-[#fbbf24]/40 bg-[#fff0c2] p-4 text-[#594045] shadow-sm"><div className="flex min-w-0 flex-col gap-1"><span className="text-[9px] font-bold tracking-wide text-[#4b6515]">OKUPANSI ZONASI</span><strong className="text-xl">{occupancyPercentage}% <small className="text-[10px] font-normal">Lapak Terisi</small></strong><small className="occupancy-meter h-1.5 w-full overflow-hidden rounded-full bg-white"><i className="block h-full rounded-full bg-[#4b6515] transition-all" style={{ width: `${occupancyPercentage}%` }} /></small></div><i className="fa-solid fa-store text-lg text-[#4b6515]" /></article>
          </section>
          <div className="management-toolbar category-toolbar mb-3 flex flex-wrap items-center gap-2">
            <label className="inline-flex min-h-[60px] w-full min-w-0 flex-[1_1_300px] items-center gap-0 rounded-[18px] border border-[rgba(251,191,36,0.18)] bg-[#ffe4a1] px-4 py-[10px] text-[#4b6515] shadow-[0_3px_8px_rgba(75,101,21,0.04)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[rgba(75,101,21,0.45)] max-[560px]:min-h-[52px] max-[560px]:rounded-[14px] max-[560px]:px-[11px] max-[560px]:py-2"><i className="fa-solid fa-magnifying-glass grid h-9 w-9 shrink-0 place-items-center rounded-l-full bg-white p-0 text-xs text-[#4b6515] max-[560px]:h-[34px] max-[560px]:w-8"/><input className="h-9 min-w-0 max-w-full flex-[0_1_340px] rounded-r-full bg-white px-3 py-0 text-[10px] text-[#594045] outline-none placeholder:text-[#9c9695] max-[560px]:h-[34px] max-[560px]:flex-1 max-[560px]:text-[10px]" type="search" placeholder="Cari kategori, nama toko, blok..." aria-label="Cari kategori" value={search} onChange={(event) => setSearch(event.target.value)}/></label>
            <div ref={categoryMenuRef} className="relative inline-flex min-w-[160px] items-center">
              <button type="button" className="flex h-9 max-w-full items-center gap-2 rounded-lg border border-[#c2dc80]/70 bg-white px-3 py-2 text-left text-[10px] text-[#594045] shadow-[0_1px_0_rgba(255,255,255,0.7)] focus:outline-2 focus:outline-[#4b6515]" onClick={() => setCategoryMenuOpen((current) => !current)} aria-expanded={categoryMenuOpen} aria-haspopup="listbox">
                <span className="flex-1 whitespace-nowrap">{categoryFilter}</span>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#edf5d7] text-[9px] text-[#4b6515]"><i className="fa-solid fa-chevron-down" /></span>
              </button>
              {categoryMenuOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[12px] border border-[#dfecc4] bg-[#f8faf2] p-1.5 shadow-[0_8px_24px_rgba(75,101,21,0.08)]" role="listbox" aria-label="Pilih kategori">
                  {[
                    "Semua Kategori",
                    ...categoryNames,
                  ].map((category) => {
                    const selected = categoryFilter === category;
                    return (
                      <button key={category} type="button" className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[10px] transition ${selected ? "bg-[#eaf3d4] text-[#3e4f1a]" : "text-[#594045] hover:bg-[#edf5d7]"}`} onClick={() => { setCategoryFilter(category); setCategoryMenuOpen(false); }} role="option" aria-selected={selected}>
                        <span>{category}</span>
                        {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#4b6515]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div ref={sortMenuRef} className="relative inline-flex min-w-[170px] items-center">
              <button type="button" className="flex h-9 max-w-full items-center gap-2 rounded-lg border border-[#c2dc80]/70 bg-white px-3 py-2 text-left text-[10px] text-[#594045] shadow-[0_1px_0_rgba(255,255,255,0.7)] focus:outline-2 focus:outline-[#4b6515]" onClick={() => setSortMenuOpen((current) => !current)} aria-haspopup="listbox" aria-expanded={sortMenuOpen}>
                <span className="flex-1 whitespace-nowrap">{sortOption}</span>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#edf5d7] text-[9px] text-[#4b6515]"><i className="fa-solid fa-chevron-down" /></span>
              </button>
              {sortMenuOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[12px] border border-[#dfecc4] bg-[#f8faf2] p-1.5 shadow-[0_8px_24px_rgba(75,101,21,0.08)]" role="listbox" aria-label="Urutkan kategori">
                  {[
                    "Urutkan: Toko Terbanyak",
                    "Urutkan: A-Z",
                  ].map((option) => {
                    const selected = sortOption === option;
                    return (
                      <button key={option} type="button" className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[10px] transition ${selected ? "bg-[#eaf3d4] text-[#3e4f1a]" : "text-[#594045] hover:bg-[#edf5d7]"}`} onClick={() => { setSortOption(option); setSortMenuOpen(false); }} role="option" aria-selected={selected}>
                        <span>{option}</span>
                        {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#4b6515]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <button className="category-tool-button inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#c2dc80]/70 bg-white px-3 text-[10px] font-semibold text-[#4b6515] hover:bg-[#edf5d7]" type="button"><i className="fa-solid fa-table-cells" /> Kelola Kategori</button>
            <button className="category-tool-button inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#c2dc80]/70 bg-white px-3 text-[10px] font-semibold text-[#4b6515] hover:bg-[#edf5d7]" type="button"><i className="fa-solid fa-table" /> Tabel Detail</button>
          </div>
          <div className="grid min-w-0 grid-cols-4 items-stretch gap-[10px] py-[14px] pb-2 max-[980px]:gap-2 max-[760px]:grid-cols-2 max-[760px]:gap-3">
            {isLoading && !sortedCategoryEntries.length ? (
              <p className="col-span-full p-[18px] text-center text-[11px] text-[#74666a]">Memuat kategori dan daftar toko dari database...</p>
            ) : sortedCategoryEntries.map(([category, entries]) => (
              <CategoryCard
                key={category}
                category={category}
                entries={entries}
              />
            ))}
            {!isLoading && !sortedCategoryEntries.length && <p className="col-span-full p-[18px] text-center text-[11px] text-[#74666a]">Kategori tidak ditemukan.</p>}
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-end gap-3 py-3 pb-0.5 max-[560px]:gap-2">
            <span className="category-standard hidden items-center gap-2 text-[9px] text-[#74666a] xl:inline-flex">
              <i className="fa-solid fa-shield-halved text-[#4b6515]" /> Daftar toko tersinkronisasi otomatis dengan halaman Kelola Toko
            </span>
            <Link
              href="/kelola-toko"
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#c2dc80] bg-white px-3 text-[10px] font-semibold text-[#4b6515] hover:bg-[#edf5d7]"
            >
              <i className="fa-solid fa-store" /> Kelola Toko
            </Link>
          </div>
        </main>
      <dialog className="m-auto max-h-[90vh] max-w-[min(92vw,420px)] rounded-2xl border border-[rgba(194,220,128,0.7)] bg-white text-[#594045] shadow-2xl backdrop:bg-black/40" ref={dialogRef}>
        <form className="create-form w-[min(92vw,420px)] space-y-4 p-6" onSubmit={addCategory}>
          <h2 className="text-lg font-bold text-[#594045]">Tambah Kategori Baru</h2>
          <div className="create-fields grid gap-3 [&_input]:rounded-lg [&_input]:border [&_input]:border-[rgba(194,220,128,0.75)] [&_input]:p-2 [&_input]:text-[#594045] [&_input:focus]:border-[#4b6515] [&_input:focus]:outline-2 [&_input:focus]:outline-[rgba(194,220,128,0.45)]">
            <label className="grid gap-1 text-xs font-semibold">
              Nama Kategori Baru
              <input className="rounded-lg border border-[rgba(194,220,128,0.75)] p-2 text-[#594045] focus:border-[#4b6515] focus:outline-2 focus:outline-[rgba(194,220,128,0.45)]" name="category" placeholder="Contoh: Aneka Minuman / Bumbu Dapur" required />
            </label>
          </div>
          {formError && <p className="m-0 text-xs text-red-700" role="alert">{formError}</p>}
          <div className="create-actions flex justify-end gap-2">
            <button className="cancel-button rounded-lg bg-[#f2f1ec] px-4 py-2 text-xs text-[#594045] hover:bg-[#e7e5dc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" type="button" onClick={() => dialogRef.current?.close()}>Batal</button>
            <button className="add-button rounded-lg bg-[#c2dc80] px-4 py-2 text-xs font-semibold text-[#594045] hover:bg-[#b5d36b] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515]" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Tambah Kategori Baru"}
            </button>
          </div>
        </form>
      </dialog>
    </AdminLayout>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../../../components/ManagementTable";
import { ApiError } from "../../../../lib/api";
import { useAuth } from "../../../../lib/user-auth";
import {
  createStore,
  deleteStore,
  getManagedStores,
  getStoreCategories,
  mapStoreFormToCreateRequest,
  mapStoreFormToUpdateRequest,
  updateStore,
  type Store,
  type StoreCategory,
  type StoreFormValues,
} from "../../../../lib/store-api";
import TambahTokoBaru, { type TokoData } from "./TambahTokoBaru";

type Notice = { type: "success" | "error"; message: string };

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.errors.length > 0
      ? `${error.message} ${error.errors.join(" ")}`
      : error.message;
  }
  return error instanceof Error ? error.message : "Operasi toko gagal. Silakan coba lagi.";
}

function toStoreFormValues(data: TokoData): StoreFormValues {
  return {
    store: data.store,
    owner: data.owner,
    category: data.category,
    zone: data.zone,
    status: data.status,
    operatingHours: data.operatingHours,
    establishedYear: data.establishedYear,
    phone: data.phone,
    email: data.email ?? "",
    description: data.description,
    bannerImage: data.bannerImage,
    logoImage: data.logoImage,
    products: data.products.map((product) => ({
      nama: product.nama,
      harga: product.harga,
      deskripsi: product.deskripsi,
      foto: product.foto,
    })),
  };
}

function toFormData(store: Store): TokoData {
  return {
    id: String(store.id),
    store: store.name,
    owner: store.owner,
    category: store.category,
    zone: store.zone,
    status: store.status === "buka"
      ? "Buka"
      : store.status === "tutup"
        ? "Tutup"
        : "Menunggu Verifikasi",
    operatingHours: store.operatingHours,
    establishedYear: store.establishedYear === null ? "" : String(store.establishedYear),
    phone: store.phone,
    email: store.email,
    description: store.description,
    bannerImage: store.bannerUrl,
    logoImage: store.logoUrl,
    products: (store.products ?? []).map((p) => ({
      id: String(p.id),
      nama: p.name,
      harga: String(p.price),
      deskripsi: p.description,
      foto: p.photoUrl,
    })),
  };
}

function isProtectedStore(store: Store): boolean {
  return store.slug === "lumpur-kentang-27" || store.name === "Dicuri";
}

export default function KelolaToko() {
  const { currentUser } = useAuth();
  const canEditStatus = currentUser?.role === "admin";
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<StoreCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isMutating, setIsMutating] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  const loadStores = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      setStores(await getManagedStores());
    } catch (error) {
      setLoadError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStores();
    getStoreCategories()
      .then(setCategories)
      .catch((error: unknown) => setCategoryError(getErrorMessage(error)));
  }, [loadStores]);

  const saveNewStore = useCallback(async (data: TokoData) => {
    setIsMutating(true);
    setNotice(null);
    try {
      const request = mapStoreFormToCreateRequest(toStoreFormValues(data), categories);
      await createStore(request);
      await loadStores();
      setNotice({ type: "success", message: "Toko berhasil ditambahkan." });
    } catch (error) {
      const message = getErrorMessage(error);
      setNotice({ type: "error", message });
      throw new Error(message);
    } finally {
      setIsMutating(false);
    }
  }, [categories, loadStores]);

  const saveEditedStore = useCallback(async (store: Store, data: TokoData) => {
    if (isProtectedStore(store)) {
      const message = "Toko Dicuri tidak dapat diubah dari halaman ini.";
      setNotice({ type: "error", message });
      throw new Error(message);
    }

    setIsMutating(true);
    setNotice(null);
    try {
      const request = mapStoreFormToUpdateRequest(
        toStoreFormValues(data),
        categories,
        { includeStatus: canEditStatus },
      );
      delete request.products;
      await updateStore(store.id, request);
      await loadStores();
      setNotice({ type: "success", message: "Perubahan toko berhasil disimpan." });
    } catch (error) {
      const message = getErrorMessage(error);
      setNotice({ type: "error", message });
      throw new Error(message);
    } finally {
      setIsMutating(false);
    }
  }, [canEditStatus, categories, loadStores]);

  const removeStore = useCallback(async (store: Store) => {
    if (isProtectedStore(store)) {
      setNotice({ type: "error", message: "Toko Dicuri tidak dapat dihapus dari halaman ini." });
      return;
    }
    if (!window.confirm(`Hapus toko "${store.name}"? Tindakan ini tidak dapat dibatalkan.`)) return;

    setIsMutating(true);
    setNotice(null);
    try {
      await deleteStore(store.id);
      await loadStores();
      setNotice({ type: "success", message: "Toko berhasil dihapus." });
    } catch (error) {
      setNotice({ type: "error", message: getErrorMessage(error) });
    } finally {
      setIsMutating(false);
    }
  }, [loadStores]);

  const records = useMemo(() => stores.map((store) => ({
    id: String(store.id),
    store: store.name,
    handle: store.slug ? `@${store.slug}` : "—",
    owner: store.owner || "—",
    email: store.email || "—",
    phone: store.phone || "—",
    category: store.category,
    rating: store.reviewCount > 0 ? store.rating.toFixed(1) : "—",
    transactions: store.productCount === 1 ? "1 produk" : `${store.productCount} produk`,
    zone: store.zone || "—",
    status: store.status === "menunggu_verifikasi"
      ? "Menunggu Verifikasi"
      : store.status === "tutup"
        ? "Tutup / Terverifikasi"
        : "Aktif / Terverifikasi",
    logoImage: store.logoUrl ?? "",
    bannerImage: store.bannerUrl ?? "",
  })), [stores]);

  const config = useMemo<ManagementTableConfig<TokoData>>(() => {
    const categoryNames = [...new Set(records.map((record) => record.category))].sort();
    const statuses = [...new Set(records.map((record) => record.status))].sort();
    const zones = [...new Set(records.map((record) => record.zone).filter((zone) => zone !== "—"))].sort();

    return {
      className: "store-management",
      tableClass: "store-table",
      title: "Kelola Toko Pasar Oro-Oro Dowo",
      description: "Manajemen operasional, sertifikasi digital, dan kurasi direktori pedagang Pasar Oro-Oro Dowo Malang.",
      breadcrumb: "KELOLA TOKO",
      addLabel: "Tambah Toko Baru",
      searchPlaceholder: "Cari nama toko, pemilik, atau blok...",
      searchLabel: "Cari toko",
      storageKey: "pasar-admin-stores",
      summary: [
        { label: "TOKO DITAMPILKAN", value: String(stores.length), detail: "Data dari backend", icon: "fa-store", tone: "green" },
        { label: "KATEGORI", value: String(categoryNames.length), detail: "Kategori pada daftar toko", icon: "fa-utensils", tone: "amber" },
        { label: "TOTAL PENGGUNA", value: "—", detail: "Data pengguna belum tersedia", icon: "fa-users", tone: "green" },
        { label: "TOTAL TRANSAKSI", value: "—", detail: "Data transaksi belum tersedia", icon: "fa-wallet", tone: "amber" },
      ],
      filters: [
        { label: "Semua Kategori", field: "category", options: categoryNames },
        { label: "Semua Status", field: "status", options: statuses },
        { label: "Semua Zona (Blok)", field: "zone", options: zones },
      ],
      columns: ["INFORMASI TOKO", "PEMILIK & KONTAK", "KATEGORI", "ULASAN & PRODUK", "STATUS TOKO", "AKSI"],
      initialRecords: [],
      customAddModal: ({ isOpen, onClose, onSave }) => (
        <TambahTokoBaru
          isOpen={isOpen}
          onClose={onClose}
          onSave={onSave}
          categoryOptions={categories}
          canEditStatus={canEditStatus}
          allowPhotoUpload={true}
        />
      ),
      renderRecord: (record, actions) => (
        <>
          <td>
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-10 w-10 shrink-0 overflow-hidden place-items-center rounded-xl bg-[#f8e49f] text-[#4b6515]">
                {record.logoImage || record.bannerImage ? (
                  <img
                    src={record.logoImage || record.bannerImage || ""}
                    alt={record.store}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <i className="fa-solid fa-basket-shopping" />
                )}
              </span>
              <span className="min-w-0">
                <strong className="block text-xs leading-snug text-[#594045]">{record.store}</strong>
                <small className="mt-0.5 block break-words text-[10px] leading-snug text-[#74666a]">{record.handle} • {record.zone}</small>
              </span>
            </div>
          </td>
          <td><div className="flex min-w-0 flex-col gap-1 break-words text-[10px] text-[#594045]"><strong className="text-[11px]">{record.owner}</strong><span>{record.phone}</span><span>{record.email}</span></div></td>
          <td><span className="inline-flex max-w-full rounded-lg bg-[#d9eaae] px-2.5 py-1 text-[10px] font-semibold text-[#315e20]">{record.category}</span></td>
          <td><span className="whitespace-nowrap text-[13px] font-bold text-amber-600">{record.rating === "—" ? "★ —" : `★ ${record.rating}`}</span><small className="mt-1 block text-[9px] text-[#74666a]">{record.transactions}</small></td>
          <td><span className={`inline-flex max-w-full items-center gap-1 rounded-lg px-2 py-1 text-[9px] font-semibold leading-snug ${String(record.status ?? "").includes("Terverifikasi") ? "bg-[#d9eaae] text-[#315e20]" : "bg-amber-300 text-[#594045]"}`}><i className="fa-solid fa-circle-check" /> {record.status || "—"}</span></td>
          <td>
            <div className="flex items-center justify-end gap-1">
              <button
                className="grid h-8 w-8 place-items-center rounded-lg text-[#4b6515] hover:bg-[#edf5d7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4b6515] disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                aria-label={`Edit ${record.store}`}
                title={actions?.isProtected ? "Toko ini dilindungi dan tidak dapat diubah." : "Edit toko"}
                disabled={!actions?.onEdit || actions.isBusy || actions.isProtected}
                onClick={actions?.onEdit}
              >
                <i className="fa-solid fa-pen" />
              </button>
              <button
                className="grid h-8 w-8 place-items-center rounded-lg text-red-700 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                type="button"
                aria-label={`Hapus ${record.store}`}
                title={actions?.isProtected ? "Toko ini dilindungi dan tidak dapat dihapus." : "Hapus toko"}
                disabled={!actions?.onDelete || actions.isBusy || actions.isProtected}
                onClick={actions?.onDelete}
              >
                <i className="fa-solid fa-trash-can" />
              </button>
            </div>
          </td>
        </>
      ),
    };
  }, [canEditStatus, categories, records, stores.length]);

  const storeForRecord = useCallback((recordId: string) => (
    stores.find((store) => String(store.id) === recordId)
  ), [stores]);

  return (
    <AdminLayout activePage="stores" label="Admin Kelola Toko">
      {notice && (
        <div
          className={`mx-3 mt-3 rounded-lg border px-3 py-2 text-sm md:mx-5 ${notice.type === "success" ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}
          role={notice.type === "error" ? "alert" : "status"}
        >
          {notice.message}
        </div>
      )}
      {categoryError && (
        <div className="mx-3 mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 md:mx-5" role="alert">
          Kategori Backend gagal dimuat: {categoryError}
        </div>
      )}
      <ManagementTable
        config={config}
        remoteData={{
          records,
          isLoading,
          error: loadError,
          emptyMessage: "Belum ada toko yang dapat ditampilkan.",
          canAdd: categories.length > 0 && !categoryError,
          onSaveCustomData: saveNewStore,
          onEditRecord: categories.length > 0
            ? (record) => {
                const store = storeForRecord(record.id);
                if (store && !isProtectedStore(store)) setEditingStore(store);
              }
            : undefined,
          onDeleteRecord: (record) => {
            const store = storeForRecord(record.id);
            if (store) void removeStore(store);
          },
          isRecordProtected: (record) => {
            const store = storeForRecord(record.id);
            return store ? isProtectedStore(store) : true;
          },
          isMutating,
        }}
      />
      {editingStore && (
        <TambahTokoBaru
          key={editingStore.id}
          isOpen
          isEditing
          initialData={toFormData(editingStore)}
          categoryOptions={categories}
          canEditStatus={canEditStatus}
          allowPhotoUpload={true}
          onClose={() => setEditingStore(null)}
          onSave={(data) => saveEditedStore(editingStore, data)}
        />
      )}
    </AdminLayout>
  );
}

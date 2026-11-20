"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import ManagementTable, { type ManagementTableConfig } from "../../../../components/ManagementTable";
import { getManagedStores } from "../../../../lib/store-api";
import { useAuth } from "../../../../lib/user-auth";
import {
  initialPromoRecords,
  readAdminRecords,
  type AdminPromoRecord,
} from "../../../../lib/admin-records";
import {
  createPromotion,
  deletePromotion,
  getManagedPromotions,
  updatePromotion,
  type Promotion,
  type PromotionInput,
} from "../../../../lib/promotion-api";
import TambahKelolaPromo, { type PromoData } from "./tambahkelolapromo";

type PromotionRecord = Record<string, string> & { id: string };
type LegacyPromoRecord = AdminPromoRecord & {
  description?: string;
  code?: string;
  discountType?: string;
  periodType?: string;
  periodDisplay?: string;
  operatingHours?: string;
};

const PROMO_BOOTSTRAP_KEY = "pasar-admin-promos-bootstrap-complete";
const PROMO_BOOTSTRAP_PENDING_KEY = "pasar-admin-promos-bootstrap-pending";

function normalizeStoreName(name: string): string {
  return name.trim().toLocaleLowerCase("id").replace(/[^a-z0-9]/g, "");
}

function isHttpImageUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function toRecord(promotion: Promotion): PromotionRecord {
  return {
    id: String(promotion.id),
    store: promotion.store,
    owner: promotion.owner,
    category: promotion.category,
    discount: promotion.title,
    period: `${promotion.periodDisplay} • ${promotion.operatingHours}`,
    requirements: promotion.terms,
    quota: promotion.quota,
    status: promotion.status,
    bannerImage: promotion.bannerImage ?? "",
    code: promotion.code,
    discountType: promotion.discountType,
    description: promotion.description,
    periodType: promotion.periodType,
    periodDisplay: promotion.periodDisplay,
    operatingHours: promotion.operatingHours,
    canManage: promotion.canManage === false ? "false" : "true",
  };
}

function parsePromotionStatus(value: string): PromotionInput["status"] {
  switch (value) {
    case "Sedang Berlangsung":
    case "Akan Datang":
    case "Setiap Akhir Pekan":
    case "Hari Pasaran Khusus":
    case "Hampir Habis":
    case "Ditangguhkan":
      return value;
    default:
      throw new Error("Status promo tidak valid.");
  }
}

function parsePeriodType(value: string): PromotionInput["periodType"] {
  switch (value) {
    case "range":
    case "days":
    case "specific":
      return value;
    default:
      throw new Error("Jenis periode promo tidak valid.");
  }
}

function toInput(record: PromotionRecord): PromotionInput {
  return {
    title: record.discount,
    store: record.store,
    owner: record.owner,
    category: record.category,
    description: record.description,
    bannerImage: record.bannerImage || null,
    status: parsePromotionStatus(record.status),
    periodType: parsePeriodType(record.periodType),
    periodDisplay: record.periodDisplay,
    operatingHours: record.operatingHours,
    terms: record.requirements,
    code: record.code,
    quota: record.quota,
    discountType: record.discountType,
  };
}

function toLegacyInput(record: LegacyPromoRecord): PromotionInput {
  const [storedPeriod, storedHours] = (record.period ?? "").split(" • ", 2);
  let status: PromotionInput["status"];
  try {
    status = parsePromotionStatus(record.status);
  } catch {
    status = "Sedang Berlangsung";
  }

  return {
    title: record.discount || "Promo",
    store: record.store || "Toko Pasar",
    owner: record.owner || "Pedagang Pasar",
    category: record.category || "Promo",
    description: record.description || `${record.discount || "Promo"} di ${record.store || "toko"}.`,
    bannerImage: record.bannerImage || null,
    status,
    periodType: parsePeriodType(record.periodType || "range"),
    periodDisplay: record.periodDisplay || storedPeriod || "Periode promo",
    operatingHours: record.operatingHours || storedHours || "06.00 - 17.00 WIB",
    terms: record.requirements || "Berlaku langsung di kios.",
    code: record.code || "",
    quota: record.quota || "0 / 100",
    discountType: record.discountType || "",
  };
}

function toLegacyRecord(record: LegacyPromoRecord): PromotionRecord {
  const input = toLegacyInput(record);
  return {
    id: `local-${record.id}`,
    store: input.store,
    owner: input.owner,
    category: input.category,
    discount: input.title,
    period: `${input.periodDisplay} • ${input.operatingHours}`,
    requirements: input.terms,
    quota: input.quota,
    status: input.status,
    bannerImage: input.bannerImage ?? "",
    code: input.code,
    discountType: input.discountType,
    description: input.description,
    periodType: input.periodType,
    periodDisplay: input.periodDisplay,
    operatingHours: input.operatingHours,
    canManage: "true",
  };
}

function readLegacyPromotions(includeInitialRecords: boolean): LegacyPromoRecord[] {
  const records = readAdminRecords<LegacyPromoRecord>(
    "pasar-admin-promos",
    initialPromoRecords,
    "pasar-admin-deleted-promos",
  );
  if (includeInitialRecords) return records;
  const initialIds = new Set(initialPromoRecords.map((record) => record.id));
  return records.filter((record) => !initialIds.has(record.id));
}

function samePromotion(left: Promotion, right: PromotionInput): boolean {
  return normalizeStoreName(left.store) === normalizeStoreName(right.store)
    && left.title.trim().toLocaleLowerCase("id") === right.title.trim().toLocaleLowerCase("id")
    && left.periodDisplay.trim().toLocaleLowerCase("id") === right.periodDisplay.trim().toLocaleLowerCase("id");
}

function toId(value: string): number {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error("ID promo tidak valid.");
  }
  return id;
}

function createConfig(
  storeLogos: ReadonlyMap<string, string>,
  promotions: PromotionRecord[],
  isReadOnly: boolean,
  ownedStoreNames: string[],
  isSeller: boolean,
): ManagementTableConfig<PromotionRecord> {
  const activeCount = promotions.filter((promo) => promo.status !== "Ditangguhkan").length;
  const upcomingCount = promotions.filter((promo) => promo.status === "Akan Datang").length;

  return {
    className: "promo-management",
    tableClass: "promo-table",
    title: "Kelola Promosi Pasar Oro-Oro Dowo",
    description: "Kelola daftar promo, penawaran, dan masa berlaku promo toko pedagang secara real-time.",
    breadcrumb: "KELOLA PROMO",
    addLabel: "Tambah Promo Baru",
    searchPlaceholder: "Cari promo nama toko, blok kios, atau jenis komoditas...",
    searchLabel: "Cari promo",
    storageKey: "pasar-admin-promos",
    selectable: !isReadOnly,
    deleteLabel: "Hapus Terpilih",
    summary: [
      { label: "TOTAL PROMO AKTIF", value: String(activeCount), detail: "Promo", icon: "fa-clock", tone: "green" },
      { label: "PROMO AKAN DATANG", value: String(upcomingCount), detail: "Promo terjadwal", icon: "fa-hourglass-half", tone: "amber" },
    ],
    filters: [
      { label: "Semua Kategori", field: "category", options: [...new Set(promotions.map((promo) => promo.category))] },
      { label: "Semua Status", field: "status", options: [...new Set(promotions.map((promo) => promo.status))] },
      { label: "Semua Tipe Promo", field: "discountType", options: [...new Set(promotions.map((promo) => promo.discountType).filter(Boolean))] },
    ],
    columns: ["INFORMASI TOKO & PROMO", "PEMILIK LAPAK", "KATEGORI", "NILAI PROMO & KODE", "PERIODE & SYARAT", "KUOTA / KLAIM", "STATUS"],
    initialRecords: [],
    customAddModal: ({ isOpen, onClose, onSave }) => (
      <TambahKelolaPromo
        isOpen={isOpen}
        onClose={onClose}
        isSeller={isSeller}
        storeOptions={ownedStoreNames}
        onSave={(data: PromoData) => onSave({
          id: "",
          store: data.store,
          owner: data.owner || "Pedagang Pasar",
          category: data.category,
          discount: data.title,
          period: `${data.periodDisplay} • ${data.operatingHours}`,
          requirements: data.terms,
          quota: data.quota || "0 / 100",
          status: data.status,
          bannerImage: data.bannerImage ?? "",
          code: data.code ?? "",
          discountType: data.discountType ?? "",
          description: data.description,
          periodType: data.periodType,
          periodDisplay: data.periodDisplay,
          operatingHours: data.operatingHours,
        })}
      />
    ),
    renderRecord: (record) => {
      const quota = record.quota || "0 / 100";
      const [claimed, total] = quota.split("/");
      const quotaPercent = Math.min(100, (Number.parseInt(claimed, 10) / Number.parseInt(total, 10)) * 100);
      const storeLogo = storeLogos.get(normalizeStoreName(record.store));
      const imageUrl = isHttpImageUrl(record.bannerImage) ? record.bannerImage : storeLogo;

      return <>
        <td><div className="flex min-w-0 items-center gap-2"><span className={`relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl ${imageUrl ? "bg-white" : "bg-[#f8e49f] text-[#4b6515]"}`}>{imageUrl ? <Image src={imageUrl} alt={`Foto ${record.store}`} fill unoptimized className="object-cover" /> : <i className="fa-solid fa-store" />}</span><span className="min-w-0"><strong className="block text-[11px] leading-snug text-[#594045]">{record.store}</strong><small className="mt-0.5 block break-words text-[9px] leading-snug text-[#74666a]">Promo terbaru • {record.code || "Tanpa kode"}</small></span></div></td>
        <td><div className="flex min-w-0 flex-col gap-1 break-words text-[#594045]"><strong>{record.owner}</strong></div></td>
        <td><span className="inline-flex max-w-full rounded-lg bg-[#d9eaae] px-2.5 py-1 text-[9px] font-semibold text-[#315e20]">{record.category}</span></td>
        <td><span className="inline-flex max-w-full rounded-lg bg-[#594045] px-2.5 py-1.5 text-[9px] font-semibold text-white">{record.discount}</span><small className="mt-1 block text-[8px] text-[#74666a]">KODE: {record.code || "—"}</small></td>
        <td><span className="break-words text-[9px] font-semibold leading-relaxed text-[#4b6515]">{record.period}<br />{record.requirements}</span></td>
        <td><div className="flex min-w-0 flex-col gap-1.5"><strong className="text-[10px] text-[#594045]">{quota}</strong><progress className="h-1.5 w-full appearance-none overflow-hidden rounded-full bg-[#e7edda] accent-[#8db84f] [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#e7edda] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#8db84f] [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-[#8db84f]" max={100} value={Number.isFinite(quotaPercent) ? Math.max(0, quotaPercent) : 0} aria-label={`Kuota diklaim: ${quota}`} /></div></td>
        <td><span className={`inline-flex max-w-full rounded-lg px-2 py-1 text-[9px] font-semibold leading-snug ${record.status === "Akan Datang" || record.status === "Ditangguhkan" ? "bg-[#f8e49f] text-[#594045]" : record.status === "Hampir Habis" ? "bg-amber-100 text-amber-800" : "bg-[#d9eaae] text-[#315e20]"}`}>{record.status || "Sedang Berlangsung"}</span></td>
      </>;
    },
  };
}

export default function KelolaPromo() {
  const { currentUser, isInitialized } = useAuth();
  const [storeLogos, setStoreLogos] = useState<ReadonlyMap<string, string>>(() => new Map());
  const [ownedStoreNames, setOwnedStoreNames] = useState<string[]>([]);
  const [storeLogoError, setStoreLogoError] = useState("");
  const [promotions, setPromotions] = useState<PromotionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  useEffect(() => {
    let active = true;
    if (!isInitialized || !currentUser) return () => { active = false; };

    getManagedStores()
      .then((stores) => {
        if (!active) return;
        setStoreLogos(new Map(
          stores.flatMap((store) => store.logoUrl
            ? [[normalizeStoreName(store.name), store.logoUrl] as const]
            : []),
        ));
        setOwnedStoreNames(stores
          .filter((store) => currentUser.role === "admin" || String(store.sellerId) === String(currentUser.id))
          .map((store) => store.name));
        setStoreLogoError("");
      })
      .catch((loadError: unknown) => {
        if (active) {
          setStoreLogoError(loadError instanceof Error ? loadError.message : "Logo toko gagal dimuat.");
        }
      });

    return () => {
      active = false;
    };
  }, [currentUser, isInitialized]);

  useEffect(() => {
    let active = true;
    async function loadPromotions() {
      if (!isInitialized || !currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        let items = await getManagedPromotions();
        const bootstrapPending = localStorage.getItem(PROMO_BOOTSTRAP_PENDING_KEY) === "true";
        const shouldBootstrap = currentUser.role === "admin" && (
          localStorage.getItem(PROMO_BOOTSTRAP_KEY) !== "true" || bootstrapPending
        );

        if (shouldBootstrap) {
          localStorage.setItem(PROMO_BOOTSTRAP_PENDING_KEY, "true");
          const legacyRecords = readLegacyPromotions(true);
          for (const legacyRecord of legacyRecords) {
            const input = toLegacyInput(legacyRecord);
            if (items.some((item) => samePromotion(item, input))) continue;
            const created = await createPromotion(input);
            items = [created, ...items];
          }
          localStorage.setItem(PROMO_BOOTSTRAP_KEY, "true");
          localStorage.removeItem(PROMO_BOOTSTRAP_PENDING_KEY);
        }

        if (active) {
          setPromotions(items.map(toRecord));
          setError(null);
        }
      } catch (loadError: unknown) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Promo gagal dimuat.");
          try {
            setPromotions(readLegacyPromotions(true).map(toLegacyRecord));
          } catch (storageError: unknown) {
            const storageMessage = storageError instanceof Error
              ? storageError.message
              : "Data lokal promo tidak valid.";
            setError(`${loadError instanceof Error ? loadError.message : "Promo gagal dimuat."} ${storageMessage}`);
            setPromotions(initialPromoRecords.map((record) => toLegacyRecord(record)));
          }
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadPromotions();

    return () => {
      active = false;
    };
  }, [currentUser, isInitialized]);

  async function savePromotion(record: PromotionRecord) {
    setIsMutating(true);
    try {
      const created = await createPromotion(toInput(record));
      setPromotions((current) => [toRecord(created), ...current]);
    } finally {
      setIsMutating(false);
    }
  }

  async function removePromotions(ids: string[]) {
    setIsMutating(true);
    try {
      await Promise.all(ids.map((id) => deletePromotion(toId(id))));
      setPromotions((current) => current.filter((promo) => !ids.includes(promo.id)));
    } finally {
      setIsMutating(false);
    }
  }

  async function togglePromotionsStatus(records: PromotionRecord[]) {
    setIsMutating(true);
    try {
      const updated = await Promise.all(records.map((record) =>
        updatePromotion(toId(record.id), {
          status: record.status === "Ditangguhkan" ? "Aktif" : "Ditangguhkan",
        }),
      ));
      const updatedById = new Map(updated.map((promo) => [String(promo.id), toRecord(promo)]));
      setPromotions((current) => current.map((promo) => updatedById.get(promo.id) ?? promo));
    } finally {
      setIsMutating(false);
    }
  }

  const isReadOnly = Boolean(error);
  const isSeller = currentUser?.role === "seller";
  const config = useMemo(
    () => createConfig(storeLogos, promotions, isReadOnly, ownedStoreNames, isSeller),
    [storeLogos, promotions, isReadOnly, ownedStoreNames, isSeller],
  );

  return (
    <AdminLayout activePage="promos" label="Admin Kelola Promo">
      {storeLogoError && (
        <p className="px-4 pt-3 text-xs text-red-700" role="alert">
          Foto logo toko belum dapat dimuat: {storeLogoError}
        </p>
      )}
      {error && (
        <p className="px-4 pt-3 text-xs text-red-700" role="alert">
          Promo dari server belum dapat dimuat: {error}. Data lokal ditampilkan sebagai cadangan dan belum tersinkron ke mobile.
        </p>
      )}
      <ManagementTable
        config={config}
        remoteData={{
          records: promotions,
          isLoading,
          error,
          emptyMessage: "Belum ada promo. Tambahkan promo untuk menampilkannya di aplikasi mobile.",
          canAdd: !isReadOnly && (!isSeller || ownedStoreNames.length > 0),
          addDisabledReason: isReadOnly
            ? "Server promo belum tersedia."
            : "Akun ini belum memiliki toko terdaftar.",
          isRecordProtected: (record) => currentUser?.role !== "admin" && record.canManage !== "true",
          onSaveCustomData: savePromotion,
          onDeleteSelected: removePromotions,
          onToggleSelectedStatus: togglePromotionsStatus,
          isMutating,
        }}
      />
    </AdminLayout>
  );
}

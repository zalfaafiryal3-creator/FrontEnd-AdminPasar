import { useRef, useState, type FormEvent, type ReactNode } from "react";

type RecordEntry = { id: string; [key: string]: string };

type SelectField = {
  name: string;
  label: string;
  type: "select";
  options: string[];
  required?: boolean;
};

type InputField = {
  name: string;
  label: string;
  type?: "text" | "number" | "email" | "tel";
  value?: string;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
};

export type ManagementTableConfig = {
  className?: string;
  tableClass: string;
  title: string;
  description: string;
  addLabel: string;
  searchPlaceholder: string;
  searchLabel: string;
  storageKey: string;
  deletedStorageKey?: string;
  selectable?: boolean;
  deleteLabel?: string;
  breadcrumb?: string;
  summary?: { label: string; value: string; detail: string; icon: string; tone?: "green" | "amber" }[];
  filters?: { label: string; field: string; options: string[] }[];
  columns: string[];
  initialRecords: RecordEntry[];
  fields?: (SelectField | InputField)[];
  renderRecord: (record: RecordEntry) => ReactNode;
  onAddClick?: () => void;
  customAddModal?: (props: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (record: RecordEntry) => void;
  }) => ReactNode;
};

function readStorage<T = RecordEntry>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

type ManagementTableProps = { config: ManagementTableConfig };

export default function ManagementTable({ config }: ManagementTableProps) {
  const [records, setRecords] = useState<RecordEntry[]>(() => {
    const deletedIds = new Set(config.deletedStorageKey ? readStorage<string>(config.deletedStorageKey) : []);
    const saved = readStorage(config.storageKey)
      .map((record) => ({ ...record, id: record.id || crypto.randomUUID() }))
      .filter((record) => !deletedIds.has(record.id));
    const savedById = new Map(saved.map((record) => [record.id, record]));
    const initial = config.initialRecords
      .filter((record) => !deletedIds.has(record.id))
      .map((record) => ({ ...record, ...savedById.get(record.id) }));
    const initialIds = new Set(initial.map((record) => record.id));
    return [...initial, ...saved.filter((record) => !initialIds.has(record.id))];
  });
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState(() => new Set<string>());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleRecords = records.filter((record) =>
    Object.values(record).join(" ").toLocaleLowerCase("id").includes(search.trim().toLocaleLowerCase("id"))
    && (config.filters ?? []).every(({ field }) => !filters[field] || record[field] === filters[field] || String(record[field] ?? "").startsWith(filters[field])),
  );

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

  function handleSaveCustomRecord(record: RecordEntry) {
    if (!record.id) record.id = crypto.randomUUID();
    const updated = [...readStorage(config.storageKey), record];
    localStorage.setItem(config.storageKey, JSON.stringify(updated));
    setRecords((current) => [...current, record]);
    setIsCustomModalOpen(false);
  }

  function addRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const record = Object.fromEntries(new FormData(event.currentTarget)) as RecordEntry;
    record.id = crypto.randomUUID();
    localStorage.setItem(config.storageKey, JSON.stringify([...readStorage(config.storageKey), record]));
    setRecords((current) => [...current, record]);
    event.currentTarget.reset();
    dialogRef.current?.close();
  }

  function toggleSelection(id: string) {
    setSelectedIds((current) => {
      const updated = new Set(current);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  }

  function deleteSelected() {
    if (!selectedIds.size) return;

    const subjectLabel = (config.deleteLabel || "Promo").toLowerCase();
    if (!window.confirm(`Hapus ${selectedIds.size} ${subjectLabel} yang dipilih?`)) return;

    if (!config.deletedStorageKey) return;
    const deletedIds = new Set(readStorage<string>(config.deletedStorageKey));
    selectedIds.forEach((id) => deletedIds.add(id));
    localStorage.setItem(config.deletedStorageKey, JSON.stringify([...deletedIds]));
    localStorage.setItem(config.storageKey, JSON.stringify(
      readStorage(config.storageKey).filter((record) => !selectedIds.has(record.id)),
    ));
    setRecords((current) => current.filter((record) => !selectedIds.has(record.id)));
    setSelectedIds(new Set());
  }

  function toggleSelectedStatus() {
    const updated = records.map((record) => selectedIds.has(record.id)
      ? { ...record, status: record.status === "Ditangguhkan" ? "Aktif" : "Ditangguhkan" }
      : record);
    localStorage.setItem(config.storageKey, JSON.stringify(updated));
    setRecords(updated);
  }

  return (
    <main className={`management-view min-h-full min-w-0 px-3 py-3 md:px-5 ${config.className || ""}`}>
      {config.breadcrumb && <div className="page-breadcrumb mb-3 text-[8px] font-semibold tracking-wider text-[#65714f]">ADMIN PANEL &nbsp;›&nbsp; {config.breadcrumb}</div>}
      <div className="page-heading mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0"><h1 className="text-base leading-snug font-bold text-[#222a21] md:text-lg">{config.title}</h1><p className="mt-1 max-w-4xl text-[10px] leading-relaxed text-[#66705e] md:text-xs">{config.description}</p></div>
        <button
          className="add-button inline-flex min-h-8 shrink-0 items-center justify-center gap-1.5 rounded-md bg-[#ffb91b] px-3 py-2 text-[10px] font-semibold text-white shadow-sm transition hover:bg-[#eba900] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#496d2e]"
          type="button"
          onClick={() => {
            if (config.customAddModal) {
              setIsCustomModalOpen(true);
            } else if (config.onAddClick) {
              config.onAddClick();
            } else {
              dialogRef.current?.showModal();
            }
          }}
        >
          <i className="fa-solid fa-plus" /> {config.addLabel}
        </button>
      </div>
      {config.summary && <section className="management-summary mb-3 grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Ringkasan">{config.summary.map((metric) => <article className={`summary-card flex min-h-[70px] items-center justify-between gap-2 rounded-lg border border-[#dce8c5] bg-white p-3 shadow-sm ${metric.tone === "amber" ? "border-amber-200 bg-amber-50" : ""}`} key={metric.label}><div className="flex min-w-0 flex-col"><span className="text-[9px] text-[#66705e]">{metric.label}</span><strong className="text-base font-bold text-[#222a21]">{metric.value}</strong><small className="text-[8px] text-[#66705e]">{metric.detail}</small></div><i className={`fa-solid ${metric.icon} text-base text-[#496d2e]`} aria-hidden="true" /></article>)}</section>}
      <div className="management-toolbar mb-2 flex flex-wrap items-center gap-1.5 rounded-lg bg-white p-2 shadow-sm">
        <label className="filter-bar flex min-h-8 min-w-[140px] flex-1 items-center gap-2 rounded-full border border-[#dce8c5] bg-[#fbfcf7] px-3 text-[#61744b]"><i className="fa-solid fa-magnifying-glass text-[10px]" /><input className="w-full min-w-0 bg-transparent text-[10px] text-[#37412e] outline-none placeholder:text-[#8a9082]" type="search" placeholder={config.searchPlaceholder} aria-label={config.searchLabel} value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        {config.filters?.map((filter) => <label className="table-filter" key={filter.field}><span className="sr-only">{filter.label}</span><select className="h-8 max-w-full rounded-md border border-[#dce8c5] bg-[#fbfcf7] px-2 text-[9px] text-[#414b36] focus:outline-2 focus:outline-[#496d2e]" value={filters[filter.field] ?? ""} onChange={(event) => setFilters((current) => ({ ...current, [filter.field]: event.target.value }))}><option value="">{filter.label}</option>{filter.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>)}
        {config.selectable && <button className="table-filter-action grid h-8 w-8 place-items-center rounded-md border border-[#dce8c5] bg-white text-[#526344] hover:bg-[#edf5d7]" type="button" onClick={() => { setSearch(""); setFilters({}); }}><i className="fa-solid fa-rotate-right" aria-hidden="true" /><span className="sr-only">Reset filter</span></button>}
      </div>
      <div className="table-shell overflow-x-auto rounded-lg border border-[#dce8c5] bg-white shadow-sm">
        <table className={`data-table w-full border-collapse text-left text-[9px] md:text-[10px] [&_tbody_td]:px-2 [&_tbody_td]:py-2 [&_tbody_td]:align-middle [&_tbody_td]:text-[#394432] [&_tbody_tr:last-child]:border-b-0 ${config.tableClass}`}>
          <thead className="bg-[#f2f7e5] text-[#4b6734]"><tr>{config.selectable && <th className="selection-column px-2 py-2"><input type="checkbox" className="accent-[#496d2e]" aria-label="Pilih semua data" checked={visibleRecords.length > 0 && visibleRecords.every((record) => selectedIds.has(record.id))} onChange={(event) => setSelectedIds((current) => { const next = new Set(current); visibleRecords.forEach((record) => event.target.checked ? next.add(record.id) : next.delete(record.id)); return next; })} /></th>}{config.columns.map((column: string) => <th className="whitespace-nowrap px-2 py-2 font-semibold" key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {visibleRecords.map((record) => (
              <tr key={record.id} className={`border-t border-[#edf1e7] ${config.selectable ? "cursor-pointer hover:bg-[#f6f9ef] focus-visible:outline-2 focus-visible:outline-[#496d2e]" : "hover:bg-[#fbfcf7]"} ${selectedIds.has(record.id) ? "selected-promo bg-[#f2f7e5]" : ""}`} tabIndex={config.selectable ? 0 : undefined} aria-selected={config.selectable ? selectedIds.has(record.id) : undefined} onClick={config.selectable ? () => toggleSelection(record.id) : undefined} onKeyDown={config.selectable ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleSelection(record.id);
                }
              } : undefined}>
                {config.selectable && <td className="selection-column px-2 py-2"><input type="checkbox" className="accent-[#496d2e]" aria-label={`Pilih ${record.name || record.store || record.id}`} checked={selectedIds.has(record.id)} onChange={() => toggleSelection(record.id)} onClick={(event) => event.stopPropagation()} /></td>}
                {config.renderRecord(record)}
              </tr>
            ))}
            {!visibleRecords.length && <tr><td className="empty-table px-3 py-8 text-center text-[#66705e]" colSpan={config.columns.length + (config.selectable ? 1 : 0)}>Data tidak ditemukan.</td></tr>}
          </tbody>
        </table>
      </div>
      {config.selectable && <div className="promo-actions mt-2 flex flex-wrap items-center gap-2"><span className="selected-promo-count mr-auto text-[9px] text-[#66705e]" aria-live="polite">Terpilih: <strong className="text-[#222a21]">{selectedIds.size}</strong></span><button className="delete-promos-button inline-flex min-h-8 items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 text-[9px] font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={!selectedIds.size} onClick={deleteSelected}><i className="fa-solid fa-trash-can" /> {config.deleteLabel || "Hapus Promo"}</button><button className="bulk-action-button inline-flex min-h-8 items-center gap-1.5 rounded-md border border-[#dce8c5] bg-white px-3 text-[9px] font-semibold text-[#496d2e] hover:bg-[#edf5d7] disabled:cursor-not-allowed disabled:opacity-50" type="button" disabled={!selectedIds.size} onClick={toggleSelectedStatus}><i className="fa-regular fa-circle-pause" /> Nonaktifkan Sementara</button></div>}
      {config.customAddModal ? (
        config.customAddModal({
          isOpen: isCustomModalOpen,
          onClose: () => setIsCustomModalOpen(false),
          onSave: handleSaveCustomRecord,
        })
      ) : config.fields ? (
        <dialog className="create-dialog m-auto w-[min(92vw,480px)] rounded-xl border border-[#dce8c5] bg-white p-0 text-[#222a21] shadow-2xl backdrop:bg-black/40" ref={dialogRef}>
          <form className="create-form p-5" onSubmit={addRecord}>
            <h2 className="mb-4 text-base font-bold">{config.addLabel}</h2>
            <div className="create-fields grid gap-3 sm:grid-cols-2">
              {config.fields.map((field) => (
                <label className="grid gap-1 text-[9px] font-medium text-[#4b5842]" key={field.name}>{field.label}
                  {field.type === "select" ? <select className="h-9 rounded-md border border-[#dce8c5] bg-white px-2 text-[10px] text-[#222a21] focus:outline-2 focus:outline-[#496d2e]" name={field.name} required={field.required ?? true}>{field.options.map((option) => <option value={option} key={option}>{option}</option>)}</select> : <input className="h-9 rounded-md border border-[#dce8c5] bg-white px-2 text-[10px] text-[#222a21] focus:outline-2 focus:outline-[#496d2e]" name={field.name} type={field.type || "text"} min={field.min} max={field.max} step={field.step} defaultValue={field.value} required={field.required ?? true} />}
                </label>
              ))}
            </div>
            <div className="create-actions mt-5 flex justify-end gap-2"><button className="cancel-button rounded-md border border-[#dce8c5] bg-white px-3 py-2 text-[10px] font-semibold text-[#4b5842] hover:bg-[#f2f7e5]" type="button" onClick={() => dialogRef.current?.close()}>Batal</button><button className="add-button rounded-md bg-[#ffb91b] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#eba900]" type="submit">Simpan</button></div>
          </form>
        </dialog>
      ) : null}
    </main>
  );
}
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
  columns: string[];
  initialRecords: RecordEntry[];
  fields: (SelectField | InputField)[];
  renderRecord: (record: RecordEntry) => ReactNode;
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
  const [records, setRecords] = useState(() => {
    const deletedIds = new Set(config.deletedStorageKey ? readStorage<string>(config.deletedStorageKey) : []);
    const initial = config.initialRecords.filter((record) => !deletedIds.has(record.id));
    const saved = readStorage(config.storageKey)
      .map((record) => ({ ...record, id: record.id || crypto.randomUUID() }))
      .filter((record) => !deletedIds.has(record.id));
    return [...initial, ...saved];
  });
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState(() => new Set<string>());
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleRecords = records.filter((record) =>
    Object.values(record).join(" ").toLocaleLowerCase("id").includes(search.trim().toLocaleLowerCase("id")),
  );

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
    if (!selectedIds.size || !window.confirm(`Hapus ${selectedIds.size} promo yang dipilih?`)) return;

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

  return (
    <main className={`page-view active management-view ${config.className || ""}`}>
      <div className="page-heading">
        <div><h1>{config.title}</h1><p>{config.description}</p></div>
        <button className="add-button" type="button" onClick={() => dialogRef.current?.showModal()}><i className="fa-solid fa-plus" /> {config.addLabel}</button>
      </div>
      <label className="filter-bar"><i className="fa-solid fa-magnifying-glass" /><input type="search" placeholder={config.searchPlaceholder} aria-label={config.searchLabel} value={search} onChange={(event) => setSearch(event.target.value)} /></label>
      <div className="table-shell">
        <table className={`data-table ${config.tableClass}`}>
          <thead><tr>{config.columns.map((column: string) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {visibleRecords.map((record) => (
              <tr key={record.id} className={selectedIds.has(record.id) ? "selected-promo" : ""} tabIndex={config.selectable ? 0 : undefined} aria-selected={config.selectable ? selectedIds.has(record.id) : undefined} onClick={config.selectable ? () => toggleSelection(record.id) : undefined} onKeyDown={config.selectable ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleSelection(record.id);
                }
              } : undefined}>
                {config.renderRecord(record)}
              </tr>
            ))}
            {!visibleRecords.length && <tr><td className="empty-table" colSpan={config.columns.length}>Data tidak ditemukan.</td></tr>}
          </tbody>
        </table>
      </div>
      {config.selectable && <div className="promo-actions"><span className="selected-promo-count" aria-live="polite">{selectedIds.size ? `${selectedIds.size} dipilih` : ""}</span><button className="delete-promos-button" type="button" disabled={!selectedIds.size} onClick={deleteSelected}><i className="fa-solid fa-trash-can" /> Hapus Promo</button></div>}
      <dialog className="create-dialog" ref={dialogRef}>
        <form className="create-form" onSubmit={addRecord}>
          <h2>{config.addLabel}</h2>
          <div className="create-fields">
            {config.fields.map((field) => (
              <label key={field.name}>{field.label}
                {field.type === "select" ? <select name={field.name} required={field.required ?? true}>{field.options.map((option) => <option value={option} key={option}>{option}</option>)}</select> : <input name={field.name} type={field.type || "text"} min={field.min} max={field.max} step={field.step} defaultValue={field.value} required={field.required ?? true} />}
              </label>
            ))}
          </div>
          <div className="create-actions"><button className="cancel-button" type="button" onClick={() => dialogRef.current?.close()}>Batal</button><button className="add-button" type="submit">Simpan</button></div>
        </form>
      </dialog>
    </main>
  );
}
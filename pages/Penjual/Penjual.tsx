import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import "./Penjual.css";

const sellerSeed = [
  { id: "seller-1", name: "Budi Santoso (Lumpur Kentang)" },
  { id: "seller-2", name: "Budi Santoso (Lumpur Kentang)" },
  { id: "seller-3", name: "Budi Santoso (Lumpur Kentang)" },
  { id: "seller-4", name: "Budi Santoso (Lumpur Kentang)" },
];

export default function Penjual() {
  const [sellers, setSellers] = useState(sellerSeed);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };

  const handleDeleteSellers = () => {
    if (!selectedIds.length) return;
    setSellers((current) => current.filter((seller) => !selectedIds.includes(seller.id)));
    setSelectedIds([]);
  };

  return (
    <AdminLayout activePage="sellers" label="Admin Penjual">
      <main className="page-view active management-view">
        <div className="page-heading seller-heading"><div><h1>Kelola Penjual &amp; Verifikasi</h1><p>Pemeriksaan dokumen identitas penjual sebelum mendapatkan centang verifikasi toko.</p></div></div>

        {sellers.length > 0 ? (
          <div className="verification-grid">
            {sellers.map((seller) => {
              const selected = selectedIds.includes(seller.id);

              return (
                <article
                  className={`verification-card${selected ? " selected" : ""}`}
                  key={seller.id}
                  tabIndex={0}
                  aria-selected={selected}
                  onClick={() => toggleSelection(seller.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleSelection(seller.id);
                    }
                  }}
                >
                  <div className="verification-meta"><span>Perlu Verifikasi</span><small>2 jam lalu</small></div>
                  <h2>{seller.name}</h2>
                  <p>EMAIL: budisantoso@gmail.com &nbsp; | &nbsp; NIK: 3201xxxxxxxxx420</p>
                  <button type="button" onClick={(event) => event.stopPropagation()}>Tinjau Dokumen</button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="verification-empty">Belum ada penjual yang perlu diverifikasi.</div>
        )}

        <div className="seller-actions">
          <span className="selected-seller-count" aria-live="polite">
            {selectedIds.length ? `${selectedIds.length} dipilih` : ""}
          </span>
          <button className="delete-sellers-button" type="button" onClick={handleDeleteSellers} disabled={!selectedIds.length}>
            <i className="fa-solid fa-trash-can" aria-hidden="true" /> Hapus Penjual
          </button>
        </div>
      </main>
    </AdminLayout>
  );
}

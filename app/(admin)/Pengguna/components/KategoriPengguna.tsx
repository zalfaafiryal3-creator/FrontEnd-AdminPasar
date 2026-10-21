"use client";

import { useMemo, useState } from "react";

type UserStatus = "Aktif" | "Ditangguhkan";
type UserType = "Pelanggan" | "Pembeli";
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  type: UserType;
  activity: string;
  browser: string;
  initials: string;
  avatarTone: string;
};

const initialUsers: User[] = [
  { id: "USR-00821", name: "Mifta Annisa", email: "miftannisa@gmail.com", phone: "+62 812-3456-7890", status: "Aktif", type: "Pelanggan", activity: "2 menit lalu", browser: "Web Browser • Klojen, Malang", initials: "MA", avatarTone: "bg-[#b9e8c4] text-[#285a36]" },
  { id: "USR-00789", name: "Serli Maharani", email: "serli.m@gmail.com", phone: "+62 813-9811-4450", status: "Aktif", type: "Pelanggan", activity: "15 menit lalu", browser: "Web Browser • Lowokwaru", initials: "SM", avatarTone: "bg-[#e1e6df] text-[#526057]" },
  { id: "USR-00654", name: "Firyal Zalfa", email: "firyal.z@gmail.com", phone: "+62 821-7734-1199", status: "Aktif", type: "Pelanggan", activity: "1 jam lalu", browser: "Web Browser • Sukun, Malang", initials: "FZ", avatarTone: "bg-[#e1e6df] text-[#526057]" },
  { id: "USR-00412", name: "Naila", email: "Nafisha_Naila@gmail.com", phone: "+62 812-3341-9011", status: "Aktif", type: "Pembeli", activity: "Kemarin, 14:20", browser: "Web Browser • Blimbing", initials: "NN", avatarTone: "bg-[#e9e1cc] text-[#665b3c]" },
  { id: "USR-00302", name: "Zee", email: "ZEE@gmail.com", phone: "+62 856-3222-1134", status: "Aktif", type: "Pelanggan", activity: "3 hari lalu", browser: "Web Browser • Dau, Malang", initials: "ZE", avatarTone: "bg-[#ffd9d5] text-[#bb4940]" },
];

const fieldClass =
  "h-8 min-w-0 rounded-md border border-[#dce5ca] bg-white px-2.5 text-[9px] text-[#303830] outline-none focus-visible:ring-2 focus-visible:ring-[#8cae4e]";

export default function KategoriPengguna() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"recent" | "name">("recent");
  const [selectedIds, setSelectedIds] = useState<string[]>([initialUsers[0].id]);

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id");
    const filtered = users.filter((user) => {
      const matchesSearch =
        `${user.name} ${user.email} ${user.phone} ${user.id} ${user.browser}`
          .toLocaleLowerCase("id")
          .includes(query);
      return (
        matchesSearch &&
        (!typeFilter || user.type === typeFilter) &&
        (!statusFilter || user.status === statusFilter)
      );
    });

    if (sortOrder === "name") {
      return filtered.sort((a, b) => a.name.localeCompare(b.name, "id"));
    }

    return filtered;
  }, [users, search, typeFilter, statusFilter, sortOrder]);

  const allVisibleSelected =
    visibleUsers.length > 0 && visibleUsers.every((user) => selectedIds.includes(user.id));

  function toggleUser(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    );
  }

  function toggleAllVisible() {
    setSelectedIds((current) =>
      allVisibleSelected
        ? current.filter((id) => !visibleUsers.some((user) => user.id === id))
        : [...new Set([...current, ...visibleUsers.map((user) => user.id)])],
    );
  }

  function deleteSelected() {
    setUsers((current) => current.filter((user) => !selectedIds.includes(user.id)));
    setSelectedIds([]);
  }

  function toggleSelectedStatus() {
    setUsers((current) =>
      current.map((user) =>
        selectedIds.includes(user.id)
          ? { ...user, status: user.status === "Aktif" ? "Ditangguhkan" : "Aktif" }
          : user,
      ),
    );
    setSelectedIds([]);
  }

  function resetFilters() {
    setSearch("");
    setTypeFilter("");
    setStatusFilter("");
    setSortOrder("recent");
  }

  return (
    <section className="min-w-0 bg-[#e8f3d3] px-3 pb-3 text-[#303830] sm:px-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-[#e8eedc] p-3">
          <label className="relative min-w-[180px] flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#596258]" aria-hidden="true" />
            <input
              className={`${fieldClass} w-full pl-7`}
              type="search"
              placeholder="Cari nama pengguna..."
              aria-label="Cari nama pengguna"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <select className={fieldClass} aria-label="Filter tipe pengguna" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="">Semua Tipe Pengguna</option>
            <option value="Pelanggan">Pelanggan</option>
            <option value="Pembeli">Pembeli</option>
          </select>
          <select className={fieldClass} aria-label="Filter status pengguna" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Ditangguhkan">Ditangguhkan</option>
          </select>
          <label className="relative">
            <select className={`${fieldClass} pr-7`} aria-label="Urutkan pengguna" value={sortOrder} onChange={(event) => setSortOrder(event.target.value === "name" ? "name" : "recent")}>
              <option value="recent">Urutan: Aktivitas Terakhir</option>
              <option value="name">Urutan: Nama A-Z</option>
            </select>
            <i className="fa-solid fa-sliders pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-[#697167]" aria-hidden="true" />
          </label>
          <button
            type="button"
            onClick={resetFilters}
            className="grid size-8 shrink-0 place-items-center rounded-md border border-[#dce5ca] text-[10px] text-[#4b6515] hover:bg-[#f4f7ee]"
            aria-label="Atur ulang filter"
            title="Atur ulang filter"
          >
            <i className="fa-solid fa-rotate-right" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-10" />
              <col className="w-[31%]" />
              <col className="w-[22%]" />
              <col className="w-[12%]" />
              <col className="w-[13%]" />
              <col className="w-[19%]" />
            </colgroup>
            <thead className="bg-[#deebbd] text-[8px] font-semibold uppercase leading-tight text-[#3e493b]">
              <tr>
                <th className="px-3 py-2">
                  <input
                    type="checkbox"
                    aria-label="Pilih semua pengguna"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    className="size-3 cursor-pointer accent-[#1677ff]"
                  />
                </th>
                <th className="px-2 py-2">Pengguna</th>
                <th className="px-2 py-2">Email &amp; Verifikasi</th>
                <th className="px-2 py-2">No. WhatsApp</th>
                <th className="px-2 py-2">Status Akun</th>
                <th className="px-2 py-2">Aktivitas Terakhir</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.length ? visibleUsers.map((user) => (
                <tr className="border-b border-[#e8eedc] text-[9px] last:border-0" key={user.id}>
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={`Pilih ${user.name}`}
                      checked={selectedIds.includes(user.id)}
                      onChange={() => toggleUser(user.id)}
                      className="size-3 cursor-pointer accent-[#1677ff]"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`relative grid size-7 shrink-0 place-items-center rounded-full text-[8px] font-bold ${user.avatarTone}`}>
                        {user.initials}
                        <span className={`absolute -right-0.5 -bottom-0.5 size-2 rounded-full border border-white ${user.status === "Aktif" ? "bg-[#28733d]" : "bg-[#9a6b18]"}`} />
                      </span>
                      <span className="min-w-0">
                        <strong className="block truncate text-[9px] font-semibold text-[#252a25]">{user.name}</strong>
                        <small className="block truncate text-[8px] text-[#6a7169]">
                          @{user.name.toLocaleLowerCase("id").replace(/\s+/g, ".")} • ID: {user.id}
                        </small>
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <strong className="block break-all font-medium text-[#343a30]">{user.email}</strong>
                    <small className="mt-0.5 block text-[8px] text-[#6a7169]">Terverifikasi OTP</small>
                  </td>
                  <td className="px-2 py-2">
                    <span className="flex items-center gap-1 break-words text-[8px] text-[#343a30]">
                      {user.phone}
                      <i className="fa-brands fa-whatsapp shrink-0 text-[#28733d]" aria-label="WhatsApp" />
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[8px] ${user.status === "Aktif" ? "bg-[#bfe9c7] text-[#285a36]" : "bg-[#f5e5bd] text-[#76591d]"}`}>
                      <i className="fa-solid fa-circle text-[5px]" aria-hidden="true" /> {user.status}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <strong className="block font-medium text-[#343a30]">{user.activity}</strong>
                    <small className="mt-0.5 block text-[8px] leading-tight text-[#6a7169]">{user.browser}</small>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#6a7169]">
                    Pengguna tidak ditemukan. Ubah kata pencarian atau filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="mt-2 flex flex-wrap items-center gap-2 rounded-b-xl bg-[#deebbd] px-3 py-2 text-[9px]">
        <span className="text-[#596258]">Terpilih:</span>
        <span className="rounded bg-[#cde69b] px-2 py-1 font-semibold text-[#3d5b2c]">
          {selectedIds.length} Pengguna Terpilih
        </span>
        <button
          type="button"
          disabled={!selectedIds.length}
          onClick={deleteSelected}
          className="rounded bg-[#c92d2d] px-2 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <i className="fa-regular fa-trash-can" aria-hidden="true" /> Hapus Terpilih
        </button>
        <button
          type="button"
          disabled={!selectedIds.length}
          onClick={toggleSelectedStatus}
          className="rounded bg-white px-2 py-1 text-[#39443a] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <i className="fa-solid fa-ban" aria-hidden="true" /> Nonaktifkan / Suspend
        </button>
      </footer>
    </section>
  );
}
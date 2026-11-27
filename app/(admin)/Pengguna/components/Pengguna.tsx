"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import AdminLayout from "../../../../components/AdminLayout";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  type ApiAdminUser,
} from "../../../../lib/admin-api";
import { ApiError } from "../../../../lib/api";

export default function Pengguna() {
  const [users, setUsers] = useState<ApiAdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua Peran");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set());
  const [editingUser, setEditingUser] = useState<ApiAdminUser | null>(null);
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Gagal memuat data pengguna dari database.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id");
    return users.filter((u) => {
      const matchesSearch =
        !query || `${u.name} ${u.email} ${u.phone}`.toLocaleLowerCase("id").includes(query);
      const matchesRole =
        roleFilter === "Semua Peran" ||
        (roleFilter === "Admin" && u.role === "admin") ||
        (roleFilter === "Penjual" && u.role === "seller");
      const matchesStatus = statusFilter === "Semua Status" || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const activeCount = useMemo(
    () => users.filter((u) => u.status === "Aktif").length,
    [users],
  );

  function toggleSelection(id: number) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function openAddModal() {
    setEditingUser(null);
    setFormError("");
    dialogRef.current?.showModal();
  }

  function openEditModal(user: ApiAdminUser) {
    setEditingUser(user);
    setFormError("");
    dialogRef.current?.showModal();
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const role = String(formData.get("role") || "seller") === "admin" ? "admin" : "seller";
    const status = String(formData.get("status") || "Aktif");
    const password = String(formData.get("password") || "").trim();

    setFormError("");
    setIsSaving(true);
    try {
      if (editingUser) {
        const updated = await updateUser(editingUser.id, { name, email, phone, role, status });
        setUsers((current) => current.map((u) => (u.id === updated.id ? updated : u)));
      } else {
        const created = await createUser({
          name,
          email,
          phone,
          role,
          status,
          ...(password ? { password } : {}),
        });
        setUsers((current) => [created, ...current]);
      }
      form.reset();
      dialogRef.current?.close();
    } catch (error) {
      setFormError(error instanceof ApiError ? error.message : "Gagal menyimpan pengguna ke database.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteSelected() {
    if (!selectedIds.size) return;
    if (!window.confirm(`Hapus ${selectedIds.size} pengguna terpilih dari database?`)) return;
    setErrorMessage("");
    try {
      await Promise.all([...selectedIds].map((id) => deleteUser(id)));
      setUsers((current) => current.filter((u) => !selectedIds.has(u.id)));
      setSelectedIds(new Set());
    } catch (error) {
      setErrorMessage(error instanceof ApiError ? error.message : "Gagal menghapus pengguna dari database.");
    }
  }

  return (
    <AdminLayout activePage="users" label="Admin Pengguna">
      <main className="user-management flex min-h-[calc(100vh-58px)] w-full min-w-0 flex-col px-6 pt-[17px] pb-[18px] text-[#594045] max-[760px]:px-4 max-[560px]:px-3">
        <div className="mb-2 text-[9px] font-semibold tracking-[0.12em] text-[#74666a]">
          ADMIN PANEL &nbsp;›&nbsp; PENGGUNA
        </div>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="mb-1 text-[21px] font-bold leading-[1.3] text-[#594045] max-[760px]:text-[19px] max-[560px]:text-[17px]">
              Kelola Pengguna Admin
            </h1>
            <p className="m-0 text-xs leading-relaxed text-[#74666a]">
              Manajemen data akun, peran akses, dan status akun di Pasar Oro-Oro Dowo (tersinkron dengan database MySQL).
            </p>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-[9px] border-0 bg-[#4b6515] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#3e5510]"
          >
            <i className="fa-solid fa-plus" /> Tambah Pengguna Baru
          </button>
        </div>

        <section className="mb-4 grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
          <article className="flex items-center justify-between rounded-2xl border border-[#c2dc80]/60 bg-[#edf5d7] p-4 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold tracking-wide text-[#4b6515]">TOTAL PENGGUNA TERDAFTAR</span>
              <strong className="text-xl">{users.length}</strong>
              <small className="text-[10px] text-[#74666a]">Pengguna</small>
            </div>
            <i className="fa-solid fa-users text-lg text-[#4b6515]" />
          </article>
          <article className="flex items-center justify-between rounded-2xl border border-[#fbbf24]/40 bg-[#fff0c2] p-4 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold tracking-wide text-[#4b6515]">PENGGUNA AKTIF</span>
              <strong className="text-xl">{activeCount}</strong>
              <small className="text-[10px] text-[#74666a]">Akun Aktif</small>
            </div>
            <i className="fa-solid fa-bolt text-lg text-[#4b6515]" />
          </article>
        </section>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <label className="flex h-9 min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-[#c2dc80]/80 bg-white px-3 text-xs text-[#74666a]">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="search"
              placeholder="Cari nama atau email pengguna..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full w-full border-0 bg-transparent text-xs text-[#594045] outline-none"
            />
          </label>
          <select
            aria-label="Filter peran"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#c2dc80]/80 bg-white px-3 text-xs text-[#594045]"
          >
            <option value="Semua Peran">Semua Peran</option>
            <option value="Admin">Admin</option>
            <option value="Penjual">Penjual</option>
          </select>
          <select
            aria-label="Filter status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-lg border border-[#c2dc80]/80 bg-white px-3 text-xs text-[#594045]"
          >
            <option value="Semua Status">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Ditangguhkan">Ditangguhkan</option>
          </select>
        </div>

        {errorMessage && (
          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="overflow-x-auto rounded-2xl border border-[#c2dc80]/70 bg-[#fbfcf7] shadow-sm">
          <table className="user-table w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#c2dc80]/60 bg-[#edf5d7] text-[10px] font-bold tracking-wide text-[#4b6515]">
                <th className="w-10 p-3">
                  <span className="sr-only">Pilih</span>
                </th>
                <th className="p-3">PENGGUNA</th>
                <th className="p-3">EMAIL</th>
                <th className="p-3">NO. WHATSAPP</th>
                <th className="p-3">PERAN</th>
                <th className="p-3">STATUS AKUN</th>
                <th className="p-3 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-xs text-[#74666a]">
                    Memuat data pengguna dari database...
                  </td>
                </tr>
              ) : visibleUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-xs text-[#74666a]">
                    Data pengguna tidak ditemukan.
                  </td>
                </tr>
              ) : (
                visibleUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#c2dc80]/30 hover:bg-[#f3f7e8]/60">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(user.id)}
                        onChange={() => toggleSelection(user.id)}
                        aria-label={`Pilih ${user.name}`}
                        className="size-3.5 accent-[#4b6515]"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-xl bg-[#f8e49f] text-[#4b6515]">
                          <i className="fa-solid fa-user" />
                        </span>
                        <div>
                          <strong className="block text-[11px] text-[#594045]">{user.name}</strong>
                          <small className="text-[9px] text-[#74666a]">ID: USR-{String(user.id).padStart(4, "0")}</small>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-[11px]">{user.email}</td>
                    <td className="p-3 text-[11px]">{user.phone || "-"}</td>
                    <td className="p-3 text-[11px] font-semibold">
                      {user.role === "admin" ? "Admin" : "Penjual"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[9px] font-bold ${
                          user.status === "Aktif"
                            ? "bg-[#d9eaae] text-[#315e20]"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <i className="fa-solid fa-circle text-[6px]" /> {user.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => openEditModal(user)}
                        className="rounded-lg border border-[#c2dc80] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#4b6515] hover:bg-[#edf5d7]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <span className="text-[11px] text-[#74666a]">
            {selectedIds.size ? `${selectedIds.size} dipilih` : ""}
          </span>
          <button
            type="button"
            disabled={!selectedIds.size}
            onClick={handleDeleteSelected}
            className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border-0 bg-[#c2dc80] px-4 py-2 text-xs font-semibold text-[#594045] hover:bg-[#b5d36b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i className="fa-solid fa-trash-can" /> Hapus Terpilih
          </button>
        </div>
      </main>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-[90vh] max-w-[min(92vw,420px)] rounded-2xl border border-[#c2dc80]/70 bg-white text-[#594045] shadow-2xl backdrop:bg-black/40"
      >
        <form key={editingUser ? editingUser.id : "new"} onSubmit={handleSave} className="w-[min(92vw,420px)] space-y-3 p-6">
          <h2 className="text-base font-bold text-[#594045]">
            {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
          </h2>
          <label className="grid gap-1 text-xs font-semibold">
            Nama Lengkap
            <input
              name="name"
              defaultValue={editingUser?.name ?? ""}
              required
              className="rounded-lg border border-[#c2dc80] p-2 text-xs"
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold">
            Email
            <input
              name="email"
              type="email"
              defaultValue={editingUser?.email ?? ""}
              required
              className="rounded-lg border border-[#c2dc80] p-2 text-xs"
            />
          </label>
          <label className="grid gap-1 text-xs font-semibold">
            No. WhatsApp
            <input
              name="phone"
              type="tel"
              defaultValue={editingUser?.phone ?? ""}
              className="rounded-lg border border-[#c2dc80] p-2 text-xs"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1 text-xs font-semibold">
              Peran
              <select
                name="role"
                defaultValue={editingUser?.role ?? "seller"}
                className="rounded-lg border border-[#c2dc80] p-2 text-xs"
              >
                <option value="seller">Penjual</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label className="grid gap-1 text-xs font-semibold">
              Status
              <select
                name="status"
                defaultValue={editingUser?.status ?? "Aktif"}
                className="rounded-lg border border-[#c2dc80] p-2 text-xs"
              >
                <option value="Aktif">Aktif</option>
                <option value="Ditangguhkan">Ditangguhkan</option>
              </select>
            </label>
          </div>
          {!editingUser && (
            <label className="grid gap-1 text-xs font-semibold">
              Password Awal (opsional, min. 8 karakter)
              <input
                name="password"
                type="password"
                minLength={8}
                placeholder="Default: PasarOro123!"
                className="rounded-lg border border-[#c2dc80] p-2 text-xs"
              />
            </label>
          )}
          {formError && <p className="text-xs text-red-700" role="alert">{formError}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-lg bg-[#f2f1ec] px-4 py-2 text-xs text-[#594045] hover:bg-[#e7e5dc]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-[#4b6515] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3e5510] disabled:opacity-60"
            >
              {isSaving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </dialog>
    </AdminLayout>
  );
}

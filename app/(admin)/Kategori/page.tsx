import Kategori from "./components/Kategori";
import PilihanKategori from "./components/PilihanKategori";

export default function KategoriPage() {
  return (
    <main className="min-h-screen">
      <Kategori />
      <PilihanKategori />
    </main>
  );
}
import KategoriPromo from "./components/kategoriPromo";
import JumlahTotal from "./components/JumlahTotal";

export default function KelolaPromoPage() {
  return (
    <main className="min-h-screen bg-[#e8f3d3]">
      <JumlahTotal />
      <KategoriPromo />
    </main>
  );
}
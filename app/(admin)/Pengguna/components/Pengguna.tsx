import KategoriPengguna from "./KategoriPengguna";
import JumlahPengguna from "./JumlahPengguna";

export default function Pengguna() {
  return (
    <main className="min-h-screen bg-[#e8f3d3]">
      <JumlahPengguna />
      <KategoriPengguna />
    </main>
  );
}

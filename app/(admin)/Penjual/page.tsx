import KelolaTotalPenjual from "./components/KelolaTotalPenjual";
import KategoriPenjual from "./components/KategoriPenjual";
import Penjual from "./components/Penjual";

export default function PenjualPage() {
  return (
    <Penjual>
      <KelolaTotalPenjual />
      <KategoriPenjual />
    </Penjual>
  );
}
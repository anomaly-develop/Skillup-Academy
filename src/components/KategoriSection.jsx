import { KATEGORI } from "../data/kategori";
import { KELAS } from "../data/kelas";
import { pad2 } from "../utils/validasi";

export default function KategoriSection({ onPilihKategori }) {
  return (
    <section id="kategori" className="border-b border-line">
      <div className="container-x py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker mb-3">01 — Kategori</p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Delapan jalur belajar IT</h2>
          </div>
          <p className="max-w-sm text-sm text-ink/60">Setiap kelas dikelompokkan ke dalam satu kategori agar mudah dicari dan difilter.</p>
        </div>

        <ul className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {KATEGORI.map((kat) => {
            const jumlah = KELAS.filter((k) => k.kategori === kat.slug).length;
            return (
              <li key={kat.slug} className="bg-white">
                <button
                  type="button"
                  className="h-full w-full p-6 text-left transition-colors hover:bg-paper focus-visible:bg-paper"
                  onClick={() => onPilihKategori(kat.slug)}
                >
                  <p className="font-mono text-xs text-ink/40">{kat.nomor}</p>
                  <h3 className="mt-3 font-bold">{kat.nama}</h3>
                  <p className="mt-1 text-sm text-ink/60">{jumlah} kelas</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { KATEGORI } from "../data/kategori";
import { KELAS } from "../data/kelas";
import KelasCard from "./KelasCard";

export default function KatalogSection({
  filterKategori,
  setFilterKategori,
  filterLevel,
  setFilterLevel,
  filterFormat,
  setFilterFormat,
  kelasTampil,
  onReset,
  onDetail,
  onDaftar,
}) {
  return (
    <section id="kelas" className="border-b border-line">
      <div className="container-x py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker mb-3">02 — Katalog</p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Kelas yang tersedia</h2>
          </div>
          <p id="hasil-count" className="font-mono text-xs uppercase tracking-wider text-ink/55" aria-live="polite">
            Menampilkan {kelasTampil.length} dari {KELAS.length} kelas
          </p>
        </div>

        <div className="mb-10 flex flex-col gap-4 border border-line bg-white p-5 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label className="label" htmlFor="filter-kategori">
              Kategori
            </label>
            <select id="filter-kategori" className="input" value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)}>
              <option value="">Semua kategori</option>
              {KATEGORI.map((kat) => (
                <option key={kat.slug} value={kat.slug}>
                  {kat.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="label" htmlFor="filter-level">
              Level
            </label>
            <select id="filter-level" className="input" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
              <option value="">Semua level</option>
              <option value="pemula">Pemula</option>
              <option value="menengah">Menengah</option>
              <option value="lanjutan">Lanjutan</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="label" htmlFor="filter-format">
              Format
            </label>
            <select id="filter-format" className="input" value={filterFormat} onChange={(e) => setFilterFormat(e.target.value)}>
              <option value="">Semua format</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <button type="button" className="btn btn-ghost lg:mb-0" onClick={onReset}>
            Reset Filter
          </button>
        </div>

        <div id="grid-kelas" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {kelasTampil.map((kelas) => (
            <KelasCard key={kelas.id} kelas={kelas} onDetail={onDetail} onDaftar={onDaftar} />
          ))}
        </div>

        <p className={`${kelasTampil.length === 0 ? "" : "hidden"} border border-line bg-white p-10 text-center text-sm text-ink/60`}>
          Tidak ada kelas yang cocok. Coba ubah kata kunci atau reset filter.
        </p>
      </div>
    </section>
  );
}

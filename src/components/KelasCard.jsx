import { LABEL_FORMAT, LABEL_LEVEL, kategoriDariSlug } from "../data/kategori";
import { mentorDariId } from "../data/mentor";
import { formatRupiah } from "../utils/validasi";

export default function KelasCard({ kelas, onDetail, onDaftar }) {
  const mentor = mentorDariId(kelas.mentorId);
  const kat = kategoriDariSlug(kelas.kategori);

  return (
    <article className="card flex flex-col">
      <div className="relative flex h-36 items-end justify-between border-b border-line bg-ink/[0.04] px-4 pb-3">
        <span className="font-mono text-4xl font-bold text-ink/15" aria-hidden="true">
          {kat?.glyph}
        </span>
        <span className="absolute right-4 top-3 font-mono text-xs text-ink/40">{String(kelas.id).padStart(2, "0")}</span>
        <span className="chip">{kat?.nama}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold leading-snug">{kelas.nama}</h3>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ink/55">
          {LABEL_LEVEL[kelas.level]} · {LABEL_FORMAT[kelas.format]} · {kelas.pertemuan} pertemuan
        </p>
        <p className="mt-2 text-sm text-ink/70">
          Mentor: <span className="font-semibold text-ink">{mentor?.nama}</span>
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <p className="font-mono text-lg font-semibold">{formatRupiah(kelas.harga)}</p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => onDetail(kelas.id)}>
              Detail Kelas
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => onDaftar(kelas.id)}>
              Daftar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

import { KELAS } from "../data/kelas";

export default function ModalProfilMentor({ mentor }) {
  if (!mentor) return null;
  const kelasDiampu = KELAS.filter((k) => k.mentorId === mentor.id);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {mentor.kategori.map((kat) => (
          <span key={kat} className="chip">
            {kat}
          </span>
        ))}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink/70">{mentor.bio}</p>

      <dl className="mt-5 grid grid-cols-3 gap-3 border border-line bg-white p-4 text-center">
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-ink/50">Pengalaman</dt>
          <dd className="font-mono text-lg font-semibold">{String(mentor.pengalamanTahun).padStart(2, "0")} th</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-ink/50">Kelas Diampu</dt>
          <dd className="font-mono text-lg font-semibold">{String(kelasDiampu.length).padStart(2, "0")}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-ink/50">Status</dt>
          <dd className="font-mono text-lg font-semibold text-brand">Aktif</dd>
        </div>
      </dl>

      <div className="mt-6">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Kelas yang Diampu</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {kelasDiampu.length > 0 ? (
            kelasDiampu.map((k) => (
              <li key={k.id} className="chip">
                {k.nama}
              </li>
            ))
          ) : (
            <li className="chip">Belum ada data</li>
          )}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-6">
        <a href="#daftar-kelas" className="btn btn-primary" onClick={() => document.querySelector("#modal-detail-mentor")?.close()}>
          Lihat Katalog Kelas
        </a>
        <a href="#daftar-mentor" className="btn btn-ghost" onClick={() => document.querySelector("#modal-detail-mentor")?.close()}>
          Ajukan Diri Jadi Mentor
        </a>
      </div>
    </div>
  );
}

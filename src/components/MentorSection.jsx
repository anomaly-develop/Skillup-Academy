import { KELAS } from "../data/kelas";
import { MENTOR, inisial } from "../data/mentor";
import { pad2 } from "../utils/validasi";

function MentorCard({ mentor, onProfil }) {
  const jumlahKelas = KELAS.filter((k) => k.mentorId === mentor.id).length;

  return (
    <article className="card flex flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{mentor.nama}</h3>
          <p className="font-mono text-xs uppercase tracking-wider text-brand">{mentor.bidang}</p>
        </div>
        <span className="font-mono text-3xl font-bold text-ink/10" aria-hidden="true">
          {inisial(mentor.nama)}
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink/65">{mentor.bio}</p>
      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4 text-center">
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-ink/50">Kelas</dt>
          <dd className="font-mono text-lg font-semibold">{pad2(jumlahKelas)}</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-ink/50">Pengalaman</dt>
          <dd className="font-mono text-lg font-semibold">{pad2(mentor.pengalamanTahun)} th</dd>
        </div>
        <div>
          <dt className="text-[11px] uppercase tracking-wide text-ink/50">Status</dt>
          <dd className="font-mono text-lg font-semibold text-brand">Aktif</dd>
        </div>
      </dl>
      <button type="button" className="btn btn-ghost btn-sm mt-5" onClick={() => onProfil(mentor.id)}>
        Lihat Profil
      </button>
    </article>
  );
}

export default function MentorSection({ onProfil }) {
  return (
    <section id="mentor" className="border-b border-line">
      <div className="container-x py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker mb-3">04 — Mentor</p>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Praktisi yang mengampu kelas</h2>
          </div>
          <p className="max-w-sm text-sm text-ink/60">Mentor lolos seleksi pengelola berdasarkan bidang keahlian, pengalaman mengajar, dan portofolio.</p>
        </div>

        <div id="grid-mentor" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENTOR.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} onProfil={onProfil} />
          ))}
        </div>
      </div>
    </section>
  );
}

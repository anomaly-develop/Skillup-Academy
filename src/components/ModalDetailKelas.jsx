import { useState } from "react";
import { LABEL_FORMAT, LABEL_LEVEL, kategoriDariSlug } from "../data/kategori";
import { mentorDariId } from "../data/mentor";
import { emailValid, formatRupiah } from "../utils/validasi";
import ErrMsg from "./ErrMsg";
import { CheckIcon } from "./icons";

function FormCepat({ onDaftarCepat }) {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const v = email.trim();
    if (!v) {
      setErr("Email wajib diisi.");
      return;
    }
    if (!emailValid(v)) {
      setErr("Format email tidak valid.");
      return;
    }
    setErr("");
    setEmail("");
    onDaftarCepat(v);
  };

  return (
    <form onSubmit={submit} className="mt-6 border-t border-line pt-6" noValidate>
      <label className="label" htmlFor="cepat-email">
        Daftar cepat via email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="cepat-email"
          name="email"
          type="email"
          className="input flex-1"
          placeholder="nama@email.com"
          autoComplete="email"
          required
          aria-invalid={err ? "true" : undefined}
          aria-describedby="err-cepat-email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErr("");
          }}
        />
        <button type="submit" className="btn btn-accent">
          Daftar Kelas Ini
        </button>
      </div>
      <ErrMsg id="err-cepat-email" pesan={err} />
    </form>
  );
}

export default function ModalDetailKelas({ kelas, onDaftarCepat }) {
  if (!kelas) return null;
  const mentor = mentorDariId(kelas.mentorId);
  const perPertemuan = Math.ceil(kelas.harga / kelas.pertemuan);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <span className="chip">{LABEL_LEVEL[kelas.level]}</span>
        <span className="chip">{LABEL_FORMAT[kelas.format]}</span>
        <span className="chip">{kelas.pertemuan} pertemuan</span>
        <span className="chip">{kelas.durasi} jam</span>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink/70">{kelas.deskripsi}</p>

      <div className="mt-6">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-ink/50">Materi yang Dibahas</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {kelas.materi.map((m) => (
            <li key={m} className="flex items-start gap-2 text-sm text-ink/70">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border border-line bg-white p-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-ink/50">Mentor Pengampu</p>
          <p className="font-bold">{mentor?.nama}</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-ink/50">Biaya</p>
          <p className="font-mono text-xl font-semibold">{formatRupiah(kelas.harga)}</p>
        </div>
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ink/55">≈ {formatRupiah(perPertemuan)} per pertemuan</p>

      <FormCepat onDaftarCepat={onDaftarCepat} />
    </div>
  );
}

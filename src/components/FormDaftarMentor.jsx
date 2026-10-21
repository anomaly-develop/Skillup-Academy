import { useState } from "react";
import { KATEGORI } from "../data/kategori";
import { buatKode, emailValid, hpValid, urlValid } from "../utils/validasi";
import ErrMsg from "./ErrMsg";

const KOSONG = {
  nama: "",
  email: "",
  noHp: "",
  bidang: "",
  idKategori: "",
  pengalaman: "",
  porto: "",
  alasan: "",
};

const namaKategori = (id) => KATEGORI.find((k) => k.slug === String(id) || k.nama === String(id))?.nama || id;

export default function FormDaftarMentor({ onSimpan, pendaftaran }) {
  const [v, setV] = useState(KOSONG);
  const [err, setErr] = useState({});
  const [sukses, setSukses] = useState("");

  const ubah = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    setErr((s) => ({ ...s, [k]: "" }));
  };

  const submit = (e) => {
    e.preventDefault();
    const baru = {};
    if (!v.nama.trim()) baru.nama = "Nama lengkap wajib diisi.";
    if (!v.email.trim()) baru.email = "Email wajib diisi.";
    else if (!emailValid(v.email.trim())) baru.email = "Format email tidak valid.";
    if (!v.noHp.trim()) baru.noHp = "Nomor HP wajib diisi.";
    else if (!hpValid(v.noHp)) baru.noHp = "Nomor HP minimal 9 digit angka.";
    if (!v.bidang.trim()) baru.bidang = "Bidang keahlian wajib diisi.";
    if (!v.idKategori) baru.idKategori = "Silakan pilih kategori.";
    if (!v.pengalaman.trim()) baru.pengalaman = "Pengalaman mengajar wajib diisi.";
    if (!v.porto.trim()) baru.porto = "Tautan portofolio wajib diisi.";
    else if (!urlValid(v.porto.trim())) baru.porto = "Tautan harus alamat web valid diawali https://";
    if (!v.alasan.trim()) baru.alasan = "Alasan ingin mengajar wajib diisi.";
    setErr(baru);
    if (Object.keys(baru).length > 0) return;

    onSimpan({
      kode: buatKode("MTR"),
      dibuat: new Date().toISOString(),
      nama: v.nama.trim(),
      email: v.email.trim(),
      noHp: v.noHp.trim(),
      bidang: v.bidang.trim(),
      idKategori: v.idKategori,
      namaKategori: namaKategori(v.idKategori),
      pengalaman: v.pengalaman.trim(),
      porto: v.porto.trim(),
      alasan: v.alasan.trim(),
      status: "baru",
    });
    setSukses("Pengajuan mentor tercatat dengan status baru dan menunggu peninjauan pengelola.");
    setV(KOSONG);
    setErr({});
  };

  return (
    <div id="daftar-mentor" className="card scroll-mt-24 p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">Formulir B</p>
      <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Pendaftaran Mentor</h3>
      <p className="mt-2 text-sm text-ink/65">Pengajuan ditinjau pengelola. Mentor yang lolos seleksi dapat mulai mengampu kelas.</p>

      <form onSubmit={submit} className="mt-6 grid gap-5" noValidate>
        <div>
          <label className="label" htmlFor="mentor-nama">
            Nama Lengkap
          </label>
          <input
            id="mentor-nama"
            name="nama"
            type="text"
            className="input"
            placeholder="Nama sesuai identitas"
            autoComplete="name"
            required
            aria-invalid={err.nama ? "true" : undefined}
            aria-describedby="err-mentor-nama"
            value={v.nama}
            onChange={ubah("nama")}
          />
          <ErrMsg id="err-mentor-nama" pesan={err.nama} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="mentor-email">
              Email
            </label>
            <input
              id="mentor-email"
              name="email"
              type="email"
              className="input"
              placeholder="nama@email.com"
              autoComplete="email"
              required
              aria-invalid={err.email ? "true" : undefined}
              aria-describedby="err-mentor-email"
              value={v.email}
              onChange={ubah("email")}
            />
            <ErrMsg id="err-mentor-email" pesan={err.email} />
          </div>
          <div>
            <label className="label" htmlFor="mentor-hp">
              Nomor HP
            </label>
            <input
              id="mentor-hp"
              name="no_hp"
              type="tel"
              className="input"
              placeholder="08xxxxxxxxxx"
              autoComplete="tel"
              required
              aria-invalid={err.noHp ? "true" : undefined}
              aria-describedby="err-mentor-hp"
              value={v.noHp}
              onChange={ubah("noHp")}
            />
            <ErrMsg id="err-mentor-hp" pesan={err.noHp} />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="mentor-bidang">
            Bidang Keahlian
          </label>
          <input
            id="mentor-bidang"
            name="bidang_keahlian"
            type="text"
            className="input"
            placeholder="Contoh: Frontend Engineering"
            required
            aria-invalid={err.bidang ? "true" : undefined}
            aria-describedby="err-mentor-bidang"
            value={v.bidang}
            onChange={ubah("bidang")}
          />
          <ErrMsg id="err-mentor-bidang" pesan={err.bidang} />
        </div>

        <div>
          <label className="label" htmlFor="mentor-kategori">
            Kategori yang Diminati
          </label>
          <select
            id="mentor-kategori"
            name="id_kategori"
            className="input"
            required
            aria-invalid={err.idKategori ? "true" : undefined}
            aria-describedby="err-mentor-kategori"
            value={v.idKategori}
            onChange={ubah("idKategori")}
          >
            <option value="">Pilih kategori</option>
            {KATEGORI.map((kat) => (
              <option key={kat.slug} value={kat.slug}>
                {kat.nama}
              </option>
            ))}
          </select>
          <ErrMsg id="err-mentor-kategori" pesan={err.idKategori} />
        </div>

        <div>
          <label className="label" htmlFor="mentor-pengalaman">
            Pengalaman Mengajar
          </label>
          <textarea
            id="mentor-pengalaman"
            name="pengalaman_mengajar"
            className="input min-h-24 resize-y"
            placeholder="Ceritakan pengalaman mengajar atau membimbing yang pernah kamu lakukan"
            required
            aria-invalid={err.pengalaman ? "true" : undefined}
            aria-describedby="err-mentor-pengalaman"
            value={v.pengalaman}
            onChange={ubah("pengalaman")}
          />
          <ErrMsg id="err-mentor-pengalaman" pesan={err.pengalaman} />
        </div>

        <div>
          <label className="label" htmlFor="mentor-porto">
            Tautan Portofolio
          </label>
          <input
            id="mentor-porto"
            name="portofolio"
            type="url"
            className="input"
            placeholder="https://portofolio.dev"
            required
            aria-invalid={err.porto ? "true" : undefined}
            aria-describedby="helper-mentor-porto err-mentor-porto"
            value={v.porto}
            onChange={ubah("porto")}
          />
          <span className="helper" id="helper-mentor-porto">
            Harus berupa alamat web yang valid, diawali https://
          </span>
          <ErrMsg id="err-mentor-porto" pesan={err.porto} />
        </div>

        <div>
          <label className="label" htmlFor="mentor-alasan">
            Alasan Ingin Mengajar
          </label>
          <textarea
            id="mentor-alasan"
            name="alasan"
            className="input min-h-24 resize-y"
            placeholder="Mengapa kamu ingin menjadi mentor di Skillup Academy?"
            required
            aria-invalid={err.alasan ? "true" : undefined}
            aria-describedby="err-mentor-alasan"
            value={v.alasan}
            onChange={ubah("alasan")}
          />
          <ErrMsg id="err-mentor-alasan" pesan={err.alasan} />
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5">
          <button type="submit" className="btn btn-primary">
            Kirim Pengajuan
          </button>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink/45">Status awal: baru</p>
        </div>

        {sukses && (
          <p className="border border-brand/40 bg-brand/10 p-4 text-sm font-medium text-brand" role="status">
            {sukses}
          </p>
        )}
      </form>

      {pendaftaran.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">Pengajuan tersimpan ({pendaftaran.length})</p>
          <ul className="mt-3 space-y-2">
            {[...pendaftaran].map((r) => (
              <li key={r.kode} className="flex flex-wrap items-center justify-between gap-2 border border-line bg-paper/60 px-3 py-2 text-xs">
                <span className="font-mono">{r.kode}</span>
                <span className="flex-1 min-w-40">{r.nama} — {r.namaKategori}</span>
                <span className="chip">{r.bidang}</span>
                <span className="font-semibold uppercase text-accent">{r.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

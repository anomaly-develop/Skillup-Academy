import { useEffect, useState } from "react";
import { KELAS } from "../data/kelas";
import { LABEL_FORMAT } from "../data/kategori";
import { buatKode, emailValid, formatRupiah, hpValid } from "../utils/validasi";
import ErrMsg from "./ErrMsg";

const LABEL_METODE = { "transfer-bank": "Transfer Bank", "e-wallet": "E-Wallet", qris: "QRIS" };

const KOSONG = { nama: "", email: "", noHp: "", idKelas: "", metode: "", catatan: "" };

export default function FormDaftarKelas({ praPilih, onPraPilihDigunakan, onSimpan, pendaftaran }) {
  const [v, setV] = useState(KOSONG);
  const [err, setErr] = useState({});
  const [sukses, setSukses] = useState("");

  useEffect(() => {
    if (!praPilih) return;
    setV((prev) => ({
      ...prev,
      idKelas: praPilih.idKelas || prev.idKelas,
      email: praPilih.email || prev.email,
    }));
    onPraPilihDigunakan();
  }, [praPilih, onPraPilihDigunakan]);

  const ubah = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    setErr((s) => ({ ...s, [k]: "" }));
  };

  const kelasTerpilih = v.idKelas ? KELAS.find((k) => k.id === Number(v.idKelas)) : null;

  const submit = (e) => {
    e.preventDefault();
    const baru = {};
    if (!v.nama.trim()) baru.nama = "Nama lengkap wajib diisi.";
    if (!v.email.trim()) baru.email = "Email wajib diisi.";
    else if (!emailValid(v.email.trim())) baru.email = "Format email tidak valid.";
    if (!v.noHp.trim()) baru.noHp = "Nomor HP wajib diisi.";
    else if (!hpValid(v.noHp)) baru.noHp = "Nomor HP minimal 9 digit angka.";
    if (!v.idKelas) baru.idKelas = "Silakan pilih kelas.";
    if (!v.metode) baru.metode = "Silakan pilih metode pembayaran.";
    setErr(baru);
    if (Object.keys(baru).length > 0) return;

    const kelas = KELAS.find((k) => k.id === Number(v.idKelas));
    onSimpan({
      kode: buatKode("KLS"),
      dibuat: new Date().toISOString(),
      nama: v.nama.trim(),
      email: v.email.trim(),
      noHp: v.noHp.trim(),
      idKelas: kelas.id,
      namaKelas: kelas.nama,
      metode: v.metode,
      catatan: v.catatan.trim(),
      totalBayar: kelas.harga,
      status: "menunggu",
    });
    setSukses("Pendaftaran berhasil dicatat. Data kamu menunggu konfirmasi pengelola.");
    setV(KOSONG);
    setErr({});
  };

  return (
    <div id="daftar-kelas" className="card scroll-mt-24 p-6 md:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">Formulir A</p>
      <h3 className="mt-2 text-2xl font-extrabold tracking-tight">Pendaftaran Kelas</h3>
      <p className="mt-2 text-sm text-ink/65">Semua kolom wajib diisi. Email harus valid dan nomor HP minimal 9 digit.</p>

      <form onSubmit={submit} className="mt-6 grid gap-5" noValidate>
        <div>
          <label className="label" htmlFor="kelas-nama">
            Nama Lengkap
          </label>
          <input
            id="kelas-nama"
            name="nama"
            type="text"
            className="input"
            placeholder="Nama sesuai identitas"
            autoComplete="name"
            required
            aria-invalid={err.nama ? "true" : undefined}
            aria-describedby="err-kelas-nama"
            value={v.nama}
            onChange={ubah("nama")}
          />
          <ErrMsg id="err-kelas-nama" pesan={err.nama} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="kelas-email">
              Email
            </label>
            <input
              id="kelas-email"
              name="email"
              type="email"
              className="input"
              placeholder="nama@email.com"
              autoComplete="email"
              required
              aria-invalid={err.email ? "true" : undefined}
              aria-describedby="err-kelas-email"
              value={v.email}
              onChange={ubah("email")}
            />
            <ErrMsg id="err-kelas-email" pesan={err.email} />
          </div>
          <div>
            <label className="label" htmlFor="kelas-hp">
              Nomor HP
            </label>
            <input
              id="kelas-hp"
              name="no_hp"
              type="tel"
              className="input"
              placeholder="08xxxxxxxxxx"
              autoComplete="tel"
              required
              aria-invalid={err.noHp ? "true" : undefined}
              aria-describedby="helper-kelas-hp err-kelas-hp"
              value={v.noHp}
              onChange={ubah("noHp")}
            />
            <span className="helper" id="helper-kelas-hp">
              Minimal 9 digit angka.
            </span>
            <ErrMsg id="err-kelas-hp" pesan={err.noHp} />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="kelas-pilihan">
            Kelas yang Dipilih
          </label>
          <select
            id="kelas-pilihan"
            name="id_kelas"
            className="input"
            required
            aria-invalid={err.idKelas ? "true" : undefined}
            aria-describedby="err-kelas-pilihan"
            value={v.idKelas}
            onChange={ubah("idKelas")}
          >
            <option value="">Pilih kelas</option>
            {KELAS.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama} — {k.level[0].toUpperCase() + k.level.slice(1)}
              </option>
            ))}
          </select>
          <ErrMsg id="err-kelas-pilihan" pesan={err.idKelas} />
          {kelasTerpilih && (
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink/60" aria-live="polite">
              Total bayar {formatRupiah(kelasTerpilih.harga)} · ≈{formatRupiah(Math.ceil(kelasTerpilih.harga / kelasTerpilih.pertemuan))}/pertemuan ·{" "}
              {kelasTerpilih.durasi} jam
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="kelas-metode">
            Metode Pembayaran
          </label>
          <select
            id="kelas-metode"
            name="metode_pembayaran"
            className="input"
            required
            aria-invalid={err.metode ? "true" : undefined}
            aria-describedby="err-kelas-metode"
            value={v.metode}
            onChange={ubah("metode")}
          >
            <option value="">Pilih metode</option>
            <option value="transfer-bank">Transfer Bank</option>
            <option value="e-wallet">E-Wallet</option>
            <option value="qris">QRIS</option>
          </select>
          <ErrMsg id="err-kelas-metode" pesan={err.metode} />
        </div>

        <div>
          <label className="label" htmlFor="kelas-catatan">
            Catatan <span className="font-normal normal-case text-ink/40">(opsional)</span>
          </label>
          <textarea
            id="kelas-catatan"
            name="catatan"
            className="input min-h-24 resize-y"
            placeholder="Pertanyaan atau permintaan khusus seputar kelas"
            value={v.catatan}
            onChange={ubah("catatan")}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-line pt-5">
          <button type="submit" className="btn btn-primary">
            Kirim Pendaftaran
          </button>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink/45">Data ditinjau pengelola</p>
        </div>

        {sukses && (
          <p className="border border-brand/40 bg-brand/10 p-4 text-sm font-medium text-brand" role="status">
            {sukses}
          </p>
        )}
      </form>

      {pendaftaran.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/45">Pendaftaran tersimpan ({pendaftaran.length})</p>
          <ul className="mt-3 space-y-2">
            {[...pendaftaran].map((r) => (
              <li key={r.kode} className="flex flex-wrap items-center justify-between gap-2 border border-line bg-paper/60 px-3 py-2 text-xs">
                <span className="font-mono">{r.kode}</span>
                <span className="flex-1 min-w-40">{r.namaKelas}</span>
                <span className="chip">{LABEL_METODE[r.metode] || r.metode}</span>
                <span className="font-semibold uppercase text-accent">{r.status}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

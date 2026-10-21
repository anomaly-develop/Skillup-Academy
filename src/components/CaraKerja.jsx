const LANGKAH = [
  {
    nomor: "01",
    judul: "Pilih kelas",
    teks: "Telusuri katalog, saring berdasarkan kategori, level, dan format, lalu buka detail kelas untuk melihat materi yang dibahas.",
  },
  {
    nomor: "02",
    judul: "Daftar & bayar",
    teks: "Isi formulir pendaftaran, pilih metode pembayaran (transfer bank, e-wallet, atau QRIS), dan tunggu konfirmasi dari pengelola.",
  },
  {
    nomor: "03",
    judul: "Mulai belajar",
    teks: "Ikuti kelas dari mentor praktisi sesuai jumlah pertemuan, kerjakan latihan, dan selesaikan proyek akhir.",
  },
];

export default function CaraKerja() {
  return (
    <section className="border-b border-line">
      <div className="container-x py-16 md:py-20">
        <div className="mb-10">
          <p className="kicker mb-3">03 — Cara Kerja</p>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Tiga langkah, kelas dimulai</h2>
        </div>

        <ol className="grid gap-6 md:grid-cols-3">
          {LANGKAH.map((l) => (
            <li key={l.nomor} className="border border-line bg-white p-6">
              <p className="font-mono text-sm font-semibold text-accent">{l.nomor}</p>
              <h3 className="mt-4 text-lg font-bold">{l.judul}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{l.teks}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

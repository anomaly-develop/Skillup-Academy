const ANGGOTA = [
  "Billiam Agsa Tatema Hia",
  "Alpin Maica Pratama",
  "Dzaki Haikal Buchari",
  "Mayong Aditya Pradana",
  "Dwaia Prananta Ginting",
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold tracking-tight">SKILLUP</span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper/50">Academy</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            Platform kursus IT dan pendaftaran mentor berbasis web. Seluruh kelas berada di bidang teknologi, dari pemula hingga lanjutan.
          </p>
        </div>

        <nav aria-label="Tautan katalog">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">Jelajahi</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/70">
            <li>
              <a href="#kelas" className="transition-colors hover:text-paper">
                Katalog Kelas
              </a>
            </li>
            <li>
              <a href="#kategori" className="transition-colors hover:text-paper">
                Kategori
              </a>
            </li>
            <li>
              <a href="#mentor" className="transition-colors hover:text-paper">
                Mentor
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/40">Pendaftaran</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/70">
            <li>
              <a href="#daftar-kelas" className="transition-colors hover:text-paper">
                Daftar Kelas
              </a>
            </li>
            <li>
              <a href="#daftar-mentor" className="transition-colors hover:text-paper">
                Daftar Jadi Mentor
              </a>
            </li>
          </ul>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-paper/40">Tim</p>
          <ul className="mt-3 space-y-1 text-xs text-paper/60">
            {ANGGOTA.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-x flex flex-col gap-2 py-5 font-mono text-[11px] uppercase tracking-wider text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Skillup Academy</p>
          <p>Proyek Pemrograman Web dan Basis Data</p>
        </div>
      </div>
    </footer>
  );
}

import { KATEGORI } from "../data/kategori";
import { KELAS } from "../data/kelas";
import { MENTOR } from "../data/mentor";
import { pad2 } from "../utils/validasi";
import { ArrowIcon, CheckIcon, SearchIcon } from "./icons";

const POPULER = ["web-development", "data-science", "artificial-intelligence", "cybersecurity"];

export default function Hero({ query, setQuery, onCari, onPilihKategori }) {
  return (
    <section id="beranda" className="border-b border-line">
      <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="kicker mb-5">Platform Kursus IT &amp; Mentor</p>
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            Kelas teknologi yang langsung bisa dipraktikkan.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 md:text-lg">
            Telusuri kelas web development, data science, AI, cybersecurity, cloud, dan lainnya —
            lengkap dengan mentor praktisi, level, format belajar, serta biaya yang transparan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#kelas" className="btn btn-primary">
              Lihat Katalog Kelas
              <ArrowIcon />
            </a>
            <a href="#daftar-mentor" className="btn btn-ghost">
              Daftar Jadi Mentor
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-ink/55">
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-brand" />
              Form tervalidasi
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-brand" />
              Online &amp; offline
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-brand" />
              Mentor praktisi
            </li>
          </ul>
        </div>

        <div className="bg-ink p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50">Cari Kelas</p>

          <form role="search" onSubmit={onCari} className="mt-4 flex gap-2">
            <label className="sr-only" htmlFor="input-cari">
              Cari kategori, nama kelas, atau mentor
            </label>
            <input
              id="input-cari"
              type="search"
              name="q"
              placeholder="React, data science, nama mentor..."
              className="input flex-1"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-accent px-4" aria-label="Cari kelas">
              <SearchIcon />
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-paper/15 pt-6">
            <div>
              <p className="stat-num">{pad2(KELAS.length)}</p>
              <p className="stat-label">Kelas tersedia</p>
            </div>
            <div>
              <p className="stat-num">{pad2(KATEGORI.length)}</p>
              <p className="stat-label">Kategori IT</p>
            </div>
            <div>
              <p className="stat-num">{pad2(MENTOR.length)}</p>
              <p className="stat-label">Mentor aktif</p>
            </div>
          </div>

          <div className="mt-6 border-t border-paper/15 pt-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/50">Kategori Populer</p>
            <div className="flex flex-wrap gap-2">
              {POPULER.map((slug) => {
                const kat = KATEGORI.find((k) => k.slug === slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    className="chip border-paper/25 bg-transparent text-paper/80 transition-colors hover:bg-paper hover:text-ink"
                    onClick={() => onPilihKategori(slug)}
                  >
                    {kat?.nama || slug}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

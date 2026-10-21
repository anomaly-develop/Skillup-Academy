import { useState } from "react";
import { MenuIcon } from "./icons";

const NAV = [
  { href: "#beranda", label: "Beranda" },
  { href: "#kategori", label: "Kategori" },
  { href: "#kelas", label: "Kelas" },
  { href: "#mentor", label: "Mentor" },
  { href: "#daftar-mentor", label: "Jadi Mentor" },
];

export default function Header() {
  const [buka, setBuka] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#beranda" className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold tracking-tight">SKILLUP</span>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink/50">Academy</span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-ink/70 transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#daftar-kelas" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Daftar Kelas
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-line md:hidden"
            onClick={() => setBuka((v) => !v)}
            aria-controls="nav-mobile"
            aria-expanded={buka}
            aria-label="Buka menu navigasi"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div id="nav-mobile" className={`${buka ? "" : "hidden"} border-t border-line md:hidden`}>
        <nav aria-label="Navigasi seluler" className="container-x flex flex-col py-4">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setBuka(false)} className="border-b border-line py-3 text-sm font-semibold">
              {n.label}
            </a>
          ))}
          <a href="#daftar-kelas" onClick={() => setBuka(false)} className="btn btn-primary mt-4">
            Daftar Kelas
          </a>
        </nav>
      </div>
    </header>
  );
}

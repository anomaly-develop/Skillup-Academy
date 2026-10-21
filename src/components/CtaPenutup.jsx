export default function CtaPenutup() {
  return (
    <section className="bg-accent">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink/70">Mulai sekarang</p>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Siap ambil kelas pertama kamu?</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#daftar-kelas" className="btn bg-ink text-paper hover:bg-brand">
            Daftar Kelas
          </a>
          <a href="#kelas" className="btn btn-ghost">
            Lihat Katalog
          </a>
        </div>
      </div>
    </section>
  );
}

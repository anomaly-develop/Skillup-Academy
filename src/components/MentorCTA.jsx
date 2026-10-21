import { ArrowIcon } from "./icons";

export default function MentorCTA() {
  return (
    <section className="border-b border-line">
      <div className="container-x py-12 md:py-16">
        <div className="flex flex-col gap-6 border border-ink bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="kicker mb-3">Bergabung</p>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Punya keahlian IT? Jadilah mentor Skillup Academy.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/65">
              Kirim formulir pendaftaran berisi bidang keahlian, kategori yang diminati, pengalaman mengajar, dan portofolio. Pengelola akan meninjau pengajuanmu.
            </p>
          </div>
          <a href="#daftar-mentor" className="btn btn-primary shrink-0">
            Isi Formulir Mentor
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

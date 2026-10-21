import { useCallback, useDeferredValue, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import KategoriSection from "./components/KategoriSection";
import KatalogSection from "./components/KatalogSection";
import CaraKerja from "./components/CaraKerja";
import MentorCTA from "./components/MentorCTA";
import MentorSection from "./components/MentorSection";
import FormDaftarKelas from "./components/FormDaftarKelas";
import FormDaftarMentor from "./components/FormDaftarMentor";
import CtaPenutup from "./components/CtaPenutup";
import Footer from "./components/Footer";
import DialogShell from "./components/DialogShell";
import ModalDetailKelas from "./components/ModalDetailKelas";
import ModalProfilMentor from "./components/ModalProfilMentor";
import { KELAS, kelasDariId } from "./data/kelas";
import { mentorDariId } from "./data/mentor";
import { kategoriDariSlug } from "./data/kategori";
import { useLocalStorage } from "./hooks/useLocalStorage";

const gulirKe = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [filterKategori, setFilterKategori] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterFormat, setFilterFormat] = useState("");

  const [idKelasDetail, setIdKelasDetail] = useState(null);
  const [idMentorDetail, setIdMentorDetail] = useState(null);
  const [praPilih, setPraPilih] = useState(null);

  const [pendaftaranKelas, setPendaftaranKelas] = useLocalStorage("skillup:pendaftaran-kelas", []);
  const [pendaftaranMentor, setPendaftaranMentor] = useLocalStorage("skillup:pendaftaran-mentor", []);

  const q = deferredQuery.trim().toLowerCase();
  const kelasTampil = KELAS.filter((k) => {
    const mentor = mentorDariId(k.mentorId);
    const kat = kategoriDariSlug(k.kategori);
    const teks = `${k.nama} ${mentor?.nama || ""} ${kat?.nama || ""}`.toLowerCase();
    return (
      (!q || teks.includes(q)) &&
      (!filterKategori || k.kategori === filterKategori) &&
      (!filterLevel || k.level === filterLevel) &&
      (!filterFormat || k.format === filterFormat)
    );
  });

  const kelasDetail = idKelasDetail ? kelasDariId(idKelasDetail) : null;
  const mentorDetail = idMentorDetail ? mentorDariId(idMentorDetail) : null;

  const cariDanGulir = (e) => {
    e.preventDefault();
    gulirKe("kelas");
  };

  const resetFilter = () => {
    setQuery("");
    setFilterKategori("");
    setFilterLevel("");
    setFilterFormat("");
  };

  const pilihKategori = (slug) => {
    setQuery("");
    setFilterLevel("");
    setFilterFormat("");
    setFilterKategori(slug);
    gulirKe("kelas");
  };

  const pilihKelasDanDaftar = (id) => {
    setPraPilih({ idKelas: String(id), email: "" });
    gulirKe("daftar-kelas");
  };

  const daftarCepat = (email) => {
    if (idKelasDetail) setPraPilih({ idKelas: String(idKelasDetail), email });
    setIdKelasDetail(null);
    gulirKe("daftar-kelas");
  };

  const pakaiPraPilih = useCallback(() => setPraPilih(null), []);

  const simpanPendaftaranKelas = useCallback(
    (rec) => setPendaftaranKelas((list) => [rec, ...list]),
    [setPendaftaranKelas]
  );

  const simpanPendaftaranMentor = useCallback(
    (rec) => setPendaftaranMentor((list) => [rec, ...list]),
    [setPendaftaranMentor]
  );

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Lompat ke konten utama
      </a>

      <Header />

      <main id="konten">
        <Hero query={query} setQuery={setQuery} onCari={cariDanGulir} onPilihKategori={pilihKategori} />

        <KategoriSection onPilihKategori={pilihKategori} />

        <KatalogSection
          filterKategori={filterKategori}
          setFilterKategori={setFilterKategori}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
          filterFormat={filterFormat}
          setFilterFormat={setFilterFormat}
          kelasTampil={kelasTampil}
          onReset={resetFilter}
          onDetail={setIdKelasDetail}
          onDaftar={pilihKelasDanDaftar}
        />

        <CaraKerja />

        <MentorCTA />

        <MentorSection onProfil={setIdMentorDetail} />

        <section className="border-b border-line">
          <div className="container-x py-16 md:py-20">
            <div className="mb-10">
              <p className="kicker mb-3">05 — Formulir</p>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Daftar kelas atau jadi mentor</h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <FormDaftarKelas
                praPilih={praPilih}
                onPraPilihDigunakan={pakaiPraPilih}
                onSimpan={simpanPendaftaranKelas}
                pendaftaran={pendaftaranKelas}
              />
              <FormDaftarMentor onSimpan={simpanPendaftaranMentor} pendaftaran={pendaftaranMentor} />
            </div>
          </div>
        </section>

        <CtaPenutup />
      </main>

      <Footer />

      <DialogShell
        open={Boolean(kelasDetail)}
        onClose={() => setIdKelasDetail(null)}
        kicker={kelasDetail ? kategoriDariSlug(kelasDetail.kategori)?.nama || "" : ""}
        judul={kelasDetail?.nama || "Detail Kelas"}
        labelledBy="modal-kelas-judul"
        tutupLabel="Tutup detail kelas"
      >
        <ModalDetailKelas kelas={kelasDetail} onDaftarCepat={daftarCepat} />
      </DialogShell>

      <DialogShell
        open={Boolean(mentorDetail)}
        onClose={() => setIdMentorDetail(null)}
        kicker={mentorDetail?.bidang || ""}
        judul={mentorDetail?.nama || "Profil Mentor"}
        labelledBy="modal-mentor-judul"
        widthClass="w-[min(92vw,40rem)]"
        tutupLabel="Tutup profil mentor"
      >
        <ModalProfilMentor mentor={mentorDetail} />
      </DialogShell>
    </>
  );
}

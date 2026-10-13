const gridKelas = document.getElementById("grid-kelas");
const kartuKelas = gridKelas ? Array.from(gridKelas.querySelectorAll("[data-kelas]")) : [];
const totalKelas = kartuKelas.length;

function teksKartu(kartu) {
  const metaP = Array.from(kartu.querySelectorAll("p")).find((p) => p.textContent.includes("pertemuan"));
  const hargaP = Array.from(kartu.querySelectorAll("p")).find((p) => p.textContent.trim().startsWith("Rp"));
  const chip = kartu.querySelector(".chip");
  return {
    judul: kartu.dataset.nama || kartu.querySelector("h3")?.textContent.trim() || "",
    mentor: kartu.dataset.mentor || "",
    kategoriLabel: chip ? chip.textContent.trim() : "",
    meta: metaP ? metaP.textContent.trim() : "",
    harga: hargaP ? hargaP.textContent.trim() : ""
  };
}

const btnMenu = document.getElementById("btn-menu");
const navMobile = document.getElementById("nav-mobile");
if (btnMenu && navMobile) {
  btnMenu.addEventListener("click", () => {
    const buka = navMobile.classList.toggle("hidden") === false;
    btnMenu.setAttribute("aria-expanded", String(buka));
  });
  navMobile.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navMobile.classList.add("hidden");
      btnMenu.setAttribute("aria-expanded", "false");
    })
  );
}

const inputCari = document.getElementById("input-cari");
const formCari = document.getElementById("form-cari");
const filterKategori = document.getElementById("filter-kategori");
const filterLevel = document.getElementById("filter-level");
const filterFormat = document.getElementById("filter-format");
const filterReset = document.getElementById("filter-reset");
const hasilCount = document.getElementById("hasil-count");
const kelasKosong = document.getElementById("kelas-kosong");

function terapkanFilter() {
  const q = (inputCari?.value || "").trim().toLowerCase();
  const kat = filterKategori?.value || "";
  const lvl = filterLevel?.value || "";
  const fmt = filterFormat?.value || "";
  let tampil = 0;

  kartuKelas.forEach((kartu) => {
    const d = kartu.dataset;
    const t = teksKartu(kartu);
    const teksCari = [t.judul, t.mentor, t.kategoriLabel].join(" ").toLowerCase();
    const cocok =
      (!q || teksCari.includes(q)) &&
      (!kat || d.kategori === kat) &&
      (!lvl || d.level === lvl) &&
      (!fmt || d.format === fmt);
    kartu.classList.toggle("hidden", !cocok);
    if (cocok) tampil++;
  });

  if (hasilCount) hasilCount.textContent = `Menampilkan ${tampil} dari ${totalKelas} kelas`;
  if (kelasKosong) kelasKosong.classList.toggle("hidden", tampil !== 0);
}

inputCari?.addEventListener("input", terapkanFilter);
[filterKategori, filterLevel, filterFormat].forEach((el) => el?.addEventListener("change", terapkanFilter));

formCari?.addEventListener("submit", (e) => {
  e.preventDefault();
  terapkanFilter();
  document.getElementById("kelas")?.scrollIntoView({ behavior: "smooth" });
});

filterReset?.addEventListener("click", () => {
  if (inputCari) inputCari.value = "";
  if (filterKategori) filterKategori.value = "";
  if (filterLevel) filterLevel.value = "";
  if (filterFormat) filterFormat.value = "";
  terapkanFilter();
});

const modalKelas = document.getElementById("modal-detail-kelas");

function bukaDetailKelas(kartu) {
  if (!kartu || !modalKelas) return;
  const t = teksKartu(kartu);
  modalKelas.querySelector("#modal-kelas-kategori").textContent = t.kategoriLabel;
  modalKelas.querySelector("#modal-kelas-judul").textContent = t.judul;
  modalKelas.querySelector("#modal-kelas-mentor").textContent = t.mentor;
  modalKelas.querySelector("#modal-kelas-harga").textContent = t.harga;

  const bagian = t.meta.split("·").map((s) => s.trim()).filter(Boolean);
  modalKelas.querySelector("#modal-kelas-meta").innerHTML = bagian
    .map((b) => `<span class="chip">${b}</span>`)
    .join("");

  modalKelas.showModal();
}

const modalMentor = document.getElementById("modal-detail-mentor");

function bukaProfilMentor(kartu) {
  if (!kartu || !modalMentor) return;
  const nama = kartu.querySelector("h3")?.textContent.trim() || "";
  const bidang = kartu.querySelector("p.text-brand")?.textContent.trim() || "";
  const bio = kartu.querySelector("p.leading-relaxed")?.textContent.trim() || "";

  let pengalaman = "—";
  kartu.querySelectorAll("dl > div").forEach((div) => {
    const dt = div.querySelector("dt")?.textContent.trim().toLowerCase() || "";
    if (dt.startsWith("pengalaman")) pengalaman = div.querySelector("dd")?.textContent.trim() || "—";
  });

  const kelasDiampu = kartuKelas.filter((k) => k.dataset.mentor === nama).map((k) => k.dataset.nama);

  modalMentor.querySelector("#modal-mentor-bidang").textContent = bidang;
  modalMentor.querySelector("#modal-mentor-judul").textContent = nama;
  modalMentor.querySelector("#modal-mentor-bio").textContent = bio;
  modalMentor.querySelector("#modal-mentor-pengalaman").textContent = pengalaman;
  modalMentor.querySelector("#modal-mentor-jumlah-kelas").textContent = String(kelasDiampu.length).padStart(2, "0");
  modalMentor.querySelector("#modal-mentor-kelas").innerHTML = kelasDiampu.length
    ? kelasDiampu.map((n) => `<li class="chip">${n}</li>`).join("")
    : `<li class="chip">Belum ada data</li>`;

  modalMentor.showModal();
}

document.addEventListener("click", (e) => {
  const btnKelas = e.target.closest("[data-buka-detail]");
  if (btnKelas) bukaDetailKelas(btnKelas.closest("[data-kelas]"));

  const btnMentor = e.target.closest("[data-buka-mentor]");
  if (btnMentor) bukaProfilMentor(btnMentor.closest("[data-mentor]"));

  const tutup = e.target.closest("[data-tutup-dialog]");
  if (tutup) tutup.closest("dialog")?.close();
});

[modalKelas, modalMentor].forEach((dlg) =>
  dlg?.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
  })
);

const emailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const hpValid = (v) => v.replace(/\D/g, "").length >= 9;
const urlValid = (v) => {
  try { return new URL(v).protocol === "https:"; } catch { return false; }
};

function setError(input, errEl, pesan) {
  if (pesan) {
    input.setAttribute("aria-invalid", "true");
    errEl.textContent = pesan;
    errEl.classList.remove("hidden");
  } else {
    input.removeAttribute("aria-invalid");
    errEl.textContent = "";
    errEl.classList.add("hidden");
  }
  return !pesan;
}

function cekField(input, errEl, aturan) {
  const v = input.value.trim();
  for (const { uji, pesan } of aturan) {
    if (!uji(v)) return setError(input, errEl, pesan);
  }
  return setError(input, errEl, "");
}

const el = (id) => document.getElementById(id);

const formKelas = el("form-daftar-kelas");
formKelas?.addEventListener("submit", (e) => {
  e.preventDefault();
  const cek = [
    cekField(el("kelas-nama"), el("err-kelas-nama"), [{ uji: (v) => v !== "", pesan: "Nama lengkap wajib diisi." }]),
    cekField(el("kelas-email"), el("err-kelas-email"), [
      { uji: (v) => v !== "", pesan: "Email wajib diisi." },
      { uji: emailValid, pesan: "Format email tidak valid." }
    ]),
    cekField(el("kelas-hp"), el("err-kelas-hp"), [
      { uji: (v) => v !== "", pesan: "Nomor HP wajib diisi." },
      { uji: hpValid, pesan: "Nomor HP minimal 9 digit angka." }
    ]),
    cekField(el("kelas-pilihan"), el("err-kelas-pilihan"), [{ uji: (v) => v !== "", pesan: "Silakan pilih kelas." }]),
    cekField(el("kelas-metode"), el("err-kelas-metode"), [{ uji: (v) => v !== "", pesan: "Silakan pilih metode pembayaran." }])
  ];
  if (cek.includes(false)) return;

  const status = el("status-kelas");
  status.textContent = "Pendaftaran berhasil dikirim. Data kamu akan ditinjau pengelola.";
  status.classList.remove("hidden");
  formKelas.reset();
  status.scrollIntoView({ behavior: "smooth", block: "center" });
});

const formMentor = el("form-daftar-mentor");
formMentor?.addEventListener("submit", (e) => {
  e.preventDefault();
  const cek = [
    cekField(el("mentor-nama"), el("err-mentor-nama"), [{ uji: (v) => v !== "", pesan: "Nama lengkap wajib diisi." }]),
    cekField(el("mentor-email"), el("err-mentor-email"), [
      { uji: (v) => v !== "", pesan: "Email wajib diisi." },
      { uji: emailValid, pesan: "Format email tidak valid." }
    ]),
    cekField(el("mentor-hp"), el("err-mentor-hp"), [
      { uji: (v) => v !== "", pesan: "Nomor HP wajib diisi." },
      { uji: hpValid, pesan: "Nomor HP minimal 9 digit angka." }
    ]),
    cekField(el("mentor-bidang"), el("err-mentor-bidang"), [{ uji: (v) => v !== "", pesan: "Bidang keahlian wajib diisi." }]),
    cekField(el("mentor-kategori"), el("err-mentor-kategori"), [{ uji: (v) => v !== "", pesan: "Silakan pilih kategori." }]),
    cekField(el("mentor-pengalaman"), el("err-mentor-pengalaman"), [{ uji: (v) => v !== "", pesan: "Pengalaman mengajar wajib diisi." }]),
    cekField(el("mentor-porto"), el("err-mentor-porto"), [
      { uji: (v) => v !== "", pesan: "Tautan portofolio wajib diisi." },
      { uji: urlValid, pesan: "Tautan harus alamat web valid diawali https://" }
    ]),
    cekField(el("mentor-alasan"), el("err-mentor-alasan"), [{ uji: (v) => v !== "", pesan: "Alasan ingin mengajar wajib diisi." }])
  ];
  if (cek.includes(false)) return;

  const status = el("status-mentor");
  status.textContent = "Pengajuan mentor tersimpan dengan status baru dan menunggu peninjauan pengelola.";
  status.classList.remove("hidden");
  formMentor.reset();
  status.scrollIntoView({ behavior: "smooth", block: "center" });
});

const formCepat = el("form-cepat");
formCepat?.addEventListener("submit", (e) => {
  e.preventDefault();
  const ok = cekField(el("cepat-email"), el("err-cepat-email"), [
    { uji: (v) => v !== "", pesan: "Email wajib diisi." },
    { uji: emailValid, pesan: "Format email tidak valid." }
  ]);
  if (!ok) return;
  modalKelas?.close();
  el("daftar-kelas")?.scrollIntoView({ behavior: "smooth" });
  const emailKelas = el("kelas-email");
  if (emailKelas) emailKelas.value = el("cepat-email").value.trim();
  formCepat.reset();
});

document.querySelectorAll(".input").forEach((input) => {
  const errId = (input.getAttribute("aria-describedby") || "").split(" ").find((id) => id.startsWith("err-"));
  if (!errId) return;
  const errEl = document.getElementById(errId);
  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") === "true") setError(input, errEl, "");
  });
});

const formatRupiah = (n) => "Rp" + Number(n || 0).toLocaleString("id-ID");
const pad2 = (n) => String(n).padStart(2, "0");
const angkaDari = (teks) => Number(String(teks || "").replace(/\D/g, "")) || 0;
const escHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const slugDari = (teks) =>
  String(teks).toLowerCase().replace(/&amp;/g, "&").replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const DATA_KELAS = {
  1: { durasi: 24, deskripsi: "Kelas pengantar untuk membangun halaman web dari nol: menyusun struktur dengan HTML, mempercantik tampilan dengan CSS, dan menambahkan interaksi dengan JavaScript.",
       materi: ["Struktur dokumen HTML", "Layout dan responsive dengan CSS", "Dasar JavaScript dan manipulasi DOM", "Proyek landing page pribadi"] },
  2: { durasi: 20, deskripsi: "Pelajari cara membangun antarmuka modern berbasis komponen menggunakan React, dari state sederhana hingga pengelolaan data antar komponen.",
       materi: ["Komponen dan props", "State dan hooks", "Routing dan form", "Proyek aplikasi single page"] },
  3: { durasi: 16, deskripsi: "Kenali alur analisis data memakai Python: membersihkan data, mengolahnya, lalu membaca pola dari hasilnya.",
       materi: ["Dasar Python untuk data", "Pandas dan pembersihan data", "Statistik deskriptif", "Visualisasi dengan Matplotlib"] },
  4: { durasi: 20, deskripsi: "Memahami celah umum pada aplikasi web dan cara menutupnya sejak tahap pengembangan.",
       materi: ["OWASP Top 10", "SQL injection dan XSS", "Autentikasi dan manajemen sesi", "Uji keamanan sederhana"] },
  5: { durasi: 28, deskripsi: "Bangun aplikasi mobile lintas platform dengan Flutter dan bahasa Dart, dari tata letak widget sampai konsumsi API.",
       materi: ["Dasar Dart", "Widget dan layout", "Navigasi dan state", "Integrasi API dan rilis aplikasi"] },
  6: { durasi: 16, deskripsi: "Belajar merancang antarmuka yang jelas dan nyaman dipakai, mulai dari riset sederhana hingga prototipe interaktif di Figma.",
       materi: ["Prinsip dasar UX", "Wireframe dan alur pengguna", "Komponen dan auto layout Figma", "Prototipe dan uji kegunaan"] },
  7: { durasi: 24, deskripsi: "Pengantar machine learning: memahami cara model belajar dari data dan mengevaluasi hasilnya secara tepat.",
       materi: ["Regresi dan klasifikasi", "Pembagian data latih dan uji", "Evaluasi model", "Proyek prediksi dengan scikit-learn"] },
  8: { durasi: 20, deskripsi: "Kemas aplikasi dalam container, lalu kelola penyebarannya dalam skala besar dengan Kubernetes.",
       materi: ["Image dan container Docker", "Docker Compose", "Pod, service, dan deployment", "Skalabilitas dan rolling update"] },
  9: { durasi: 18, deskripsi: "Rancang dan kelola basis data relasional dengan PostgreSQL, dari desain tabel sampai query lanjutan.",
       materi: ["Desain tabel dan relasi", "Query SELECT, JOIN, dan agregasi", "Normalisasi data", "Indeks dan dasar optimasi"] },
  10: { durasi: 22, deskripsi: "Bangun layanan backend berbentuk API REST menggunakan Node.js, lengkap dengan validasi dan autentikasi.",
        materi: ["Dasar Node.js dan Express", "Desain endpoint REST", "Validasi dan penanganan error", "Autentikasi JWT dan dokumentasi API"] },
  11: { durasi: 14, deskripsi: "Ubah data mentah menjadi dasbor yang mudah dibaca dengan Power BI.",
        materi: ["Impor dan transformasi data", "Model data sederhana", "Visual dan filter interaktif", "Dasbor ringkasan bisnis"] },
  12: { durasi: 16, deskripsi: "Dasar pengujian keamanan jaringan: mengenali topologi, memindai layanan, dan membaca hasilnya dengan etis.",
        materi: ["Konsep jaringan dan protokol", "Pemindaian dengan Nmap", "Analisis lalu lintas", "Etika dan pelaporan temuan"] }
};

const LABEL_FORMAT = { online: "Online", offline: "Offline", hybrid: "Hybrid" };
const LABEL_LEVEL = { pemula: "Pemula", menengah: "Menengah", lanjutan: "Lanjutan" };

function infoKelas(id) {
  const kartu = kartuKelas.find((k) => k.dataset.kelas === String(id));
  if (!kartu) return null;
  const t = teksKartu(kartu);
  const pertemuan = angkaDari((t.meta.match(/(\d+)\s*pertemuan/i) || [])[1]);
  const harga = angkaDari(t.harga);
  const tambahan = DATA_KELAS[id] || {};
  return {
    id: Number(id),
    level: kartu.dataset.level,
    format: kartu.dataset.format,
    pertemuan,
    harga,
    hargaPerPertemuan: pertemuan > 0 ? Math.ceil(harga / pertemuan) : harga,
    durasi: tambahan.durasi || pertemuan * 2,
    deskripsi: tambahan.deskripsi || "",
    materi: tambahan.materi || []
  };
}

const optKategori = filterKategori ? Array.from(filterKategori.options).filter((o) => o.value) : [];

function perbaruiAngkaDinamis() {
  document.querySelectorAll("#kategori ul > li").forEach((li) => {
    const judul = li.querySelector("h3")?.textContent.trim() || "";
    const opt = optKategori.find((o) => slugDari(o.textContent) === slugDari(judul));
    const p = li.querySelector("p:last-child");
    if (opt && p) {
      p.textContent = `${kartuKelas.filter((k) => k.dataset.kategori === opt.value).length} kelas`;
    }
  });

  const stat = document.querySelectorAll("#beranda .stat-num");
  const kartuMentor = document.querySelectorAll("#grid-mentor > [data-mentor]");
  if (stat[0]) stat[0].textContent = pad2(totalKelas);
  if (stat[1] && optKategori.length) stat[1].textContent = pad2(optKategori.length);
  if (stat[2] && kartuMentor.length) stat[2].textContent = pad2(kartuMentor.length);

  kartuMentor.forEach((kartu) => {
    const nama = kartu.querySelector("h3")?.textContent.trim() || "";
    kartu.querySelectorAll("dl > div").forEach((div) => {
      if ((div.querySelector("dt")?.textContent.trim().toLowerCase() || "") === "kelas") {
        const dd = div.querySelector("dd");
        if (dd) dd.textContent = pad2(kartuKelas.filter((k) => k.dataset.mentor === nama).length);
      }
    });
  });
}
perbaruiAngkaDinamis();

const ALIAS_KATEGORI = { "web-dev": "web-development", ai: "artificial-intelligence" };

function slugKategoriDariTeks(teks) {
  const s = slugDari(teks);
  const langsung = optKategori.find((o) => o.value === s || slugDari(o.textContent) === s);
  return langsung ? langsung.value : ALIAS_KATEGORI[s] || "";
}

function filterKeKategori(slug) {
  if (!filterKategori || !slug) return;
  if (inputCari) inputCari.value = "";
  if (filterLevel) filterLevel.value = "";
  if (filterFormat) filterFormat.value = "";
  filterKategori.value = slug;
  terapkanFilter();
}

document.querySelectorAll("#beranda a.chip").forEach((a) => {
  const slug = slugKategoriDariTeks(a.textContent.trim());
  if (slug) a.addEventListener("click", () => filterKeKategori(slug));
});

document.querySelectorAll("#kategori ul > li").forEach((li) => {
  const judul = li.querySelector("h3")?.textContent.trim() || "";
  const slug = slugKategoriDariTeks(judul);
  if (!slug) return;

  li.setAttribute("tabindex", "0");
  li.setAttribute("role", "button");
  li.setAttribute("aria-label", `Tampilkan kelas ${judul}`);
  li.style.cursor = "pointer";

  const aksi = () => {
    filterKeKategori(slug);
    document.getElementById("kelas")?.scrollIntoView({ behavior: "smooth" });
  };
  li.addEventListener("click", aksi);
  li.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); aksi(); }
  });
});

const ikonCek = modalKelas?.querySelector("#modal-kelas-materi li svg")?.outerHTML || "";
let kelasModalAktif = null;

const kunciScroll = (kunci) => { document.body.style.overflow = kunci ? "hidden" : ""; };

const bukaDetailKelasAsli = bukaDetailKelas;
bukaDetailKelas = function (kartu) {
  bukaDetailKelasAsli(kartu);
  const info = kartu && modalKelas ? infoKelas(kartu.dataset.kelas) : null;
  if (!info) return;
  kelasModalAktif = info.id;

  modalKelas.querySelector("#modal-kelas-meta").innerHTML = [
    LABEL_LEVEL[info.level] || info.level,
    LABEL_FORMAT[info.format] || info.format,
    `${info.pertemuan} pertemuan`,
    `${info.durasi} jam`
  ].map((b) => `<span class="chip">${escHtml(b)}</span>`).join("");

  if (info.deskripsi) modalKelas.querySelector("#modal-kelas-deskripsi").textContent = info.deskripsi;
  if (info.materi.length) {
    modalKelas.querySelector("#modal-kelas-materi").innerHTML = info.materi
      .map((m) => `<li class="flex items-start gap-2 text-sm text-ink/70">${ikonCek}${escHtml(m)}</li>`)
      .join("");
  }

  modalKelas.querySelector("#modal-kelas-harga").textContent = formatRupiah(info.harga);

  let infoBiaya = modalKelas.querySelector("#modal-kelas-info");
  if (!infoBiaya) {
    infoBiaya = document.createElement("p");
    infoBiaya.id = "modal-kelas-info";
    infoBiaya.className = "mt-3 font-mono text-xs uppercase tracking-wider text-ink/55";
    modalKelas.querySelector("#modal-kelas-harga").closest(".border")?.insertAdjacentElement("afterend", infoBiaya);
  }
  infoBiaya.textContent = `≈ ${formatRupiah(info.hargaPerPertemuan)} per pertemuan`;

  if (formCepat) {
    formCepat.reset();
    setError(el("cepat-email"), el("err-cepat-email"), "");
  }
  kunciScroll(true);
};

const bukaProfilMentorAsli = bukaProfilMentor;
bukaProfilMentor = function (kartu) {
  bukaProfilMentorAsli(kartu);
  if (kartu && modalMentor) kunciScroll(true);
};

[modalKelas, modalMentor].forEach((dlg) => dlg?.addEventListener("close", () => kunciScroll(false)));

const pilihKelas = el("kelas-pilihan");
let ringkasanBiaya = null;

if (pilihKelas) {
  ringkasanBiaya = document.createElement("p");
  ringkasanBiaya.id = "ringkasan-biaya";
  ringkasanBiaya.className = "mt-2 hidden font-mono text-xs uppercase tracking-wider text-ink/60";
  ringkasanBiaya.setAttribute("aria-live", "polite");
  el("err-kelas-pilihan")?.insertAdjacentElement("afterend", ringkasanBiaya);
}

function perbaruiRingkasan() {
  if (!ringkasanBiaya || !pilihKelas) return;
  const info = pilihKelas.value ? infoKelas(pilihKelas.value) : null;
  ringkasanBiaya.classList.toggle("hidden", !info);
  ringkasanBiaya.textContent = info
    ? `Total bayar ${formatRupiah(info.harga)} · ≈ ${formatRupiah(info.hargaPerPertemuan)}/pertemuan · ${info.durasi} jam`
    : "";
}

function pilihKelasDenganId(id) {
  if (!pilihKelas || !id) return;
  pilihKelas.value = String(id);
  if (pilihKelas.getAttribute("aria-invalid") === "true") setError(pilihKelas, el("err-kelas-pilihan"), "");
  perbaruiRingkasan();
}

pilihKelas?.addEventListener("change", perbaruiRingkasan);
formKelas?.addEventListener("reset", () => setTimeout(perbaruiRingkasan, 0));

document.addEventListener("click", (e) => {
  const kartu = e.target.closest('a[href="#daftar-kelas"]')?.closest("[data-kelas]");
  if (kartu) pilihKelasDenganId(kartu.dataset.kelas);
});

formCepat?.addEventListener("submit", () => {
  if (el("cepat-email")?.getAttribute("aria-invalid") === "true") return;
  pilihKelasDenganId(kelasModalAktif);
});

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

export const MENTOR = [
  {
    id: "andira",
    nama: "Andira Putri",
    bidang: "Web Development",
    kategori: ["Web Development"],
    pengalamanTahun: 6,
    bio: "Frontend engineer yang fokus pada ekosistem JavaScript dan aksesibilitas antarmuka.",
  },
  {
    id: "rizky",
    nama: "Rizky Pratama",
    bidang: "Data Science · Database",
    kategori: ["Data Science", "Database"],
    pengalamanTahun: 5,
    bio: "Data analyst yang mendalami Python, SQL, dan visualisasi data untuk pengambilan keputusan.",
  },
  {
    id: "nadia",
    nama: "Nadia Kusuma",
    bidang: "UI/UX Design",
    kategori: ["UI/UX Design"],
    pengalamanTahun: 4,
    bio: "Product designer yang mengajar riset pengguna, wireframing, hingga design system.",
  },
  {
    id: "fajar",
    nama: "Fajar Nugroho",
    bidang: "Cybersecurity",
    kategori: ["Cybersecurity"],
    pengalamanTahun: 7,
    bio: "Security analyst yang berpengalaman menguji aplikasi web dan jaringan perusahaan.",
  },
  {
    id: "salsabila",
    nama: "Salsabila Rahma",
    bidang: "Mobile Development",
    kategori: ["Mobile Development"],
    pengalamanTahun: 5,
    bio: "Mobile developer Flutter yang gemar membangun aplikasi lintas platform yang ringan.",
  },
  {
    id: "dimas",
    nama: "Dimas Wibowo",
    bidang: "Cloud & DevOps · AI",
    kategori: ["Cloud & DevOps", "Artificial Intelligence"],
    pengalamanTahun: 8,
    bio: "Platform engineer yang mengelola infrastruktur cloud serta pengantar machine learning.",
  },
];

export const mentorDariId = (id) => MENTOR.find((m) => m.id === id) || null;

export const inisial = (nama) =>
  nama
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const KATEGORI = [
  { slug: "web-development", nama: "Web Development", glyph: "</>", nomor: "01" },
  { slug: "mobile-development", nama: "Mobile Development", glyph: "[ ]", nomor: "02" },
  { slug: "data-science", nama: "Data Science", glyph: "[|]", nomor: "03" },
  { slug: "ui-ux-design", nama: "UI/UX Design", glyph: "( )", nomor: "04" },
  { slug: "cybersecurity", nama: "Cybersecurity", glyph: "[x]", nomor: "05" },
  { slug: "cloud-devops", nama: "Cloud & DevOps", glyph: ">_", nomor: "06" },
  { slug: "artificial-intelligence", nama: "Artificial Intelligence", glyph: "(·)", nomor: "07" },
  { slug: "database", nama: "Database", glyph: "(=)", nomor: "08" },
];

export const LABEL_LEVEL = { pemula: "Pemula", menengah: "Menengah", lanjutan: "Lanjutan" };
export const LABEL_FORMAT = { online: "Online", offline: "Offline", hybrid: "Hybrid" };

export const kategoriDariSlug = (slug) => KATEGORI.find((k) => k.slug === slug) || null;

export const emailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const hpValid = (v) => v.replace(/\D/g, "").length >= 9;
export const urlValid = (v) => {
  try {
    return new URL(v).protocol === "https:";
  } catch {
    return false;
  }
};

export const formatRupiah = (n) => "Rp" + Number(n || 0).toLocaleString("id-ID");
export const angka = (n) => Number(n) || 0;
export const pad2 = (n) => String(n).padStart(2, "0");
export const buatKode = (prefix) => `${prefix}-${Date.now().toString(36).toUpperCase()}`;

import { useEffect, useState } from "react";

export function useLocalStorage(key, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : nilaiAwal;
    } catch {
      return nilaiAwal;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(nilai));
    } catch {
      /* penyimpanan tidak tersedia */
    }
  }, [key, nilai]);

  return [nilai, setNilai];
}

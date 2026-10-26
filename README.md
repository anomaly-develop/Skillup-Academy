# Skillup Academy

Landing page + form pendaftaran kelas & mentor, dibangun dengan React 19, Vite 7, dan Tailwind CSS 4.

Kelompok Satu Hari Di Hidup Saya

Anggota:
1. Billiam Agsa Tatema Hia (251401110)
2. Dzaki Haikal Buchari (251401050)
3. Dwaia Prananta Ginting (251401128)
4. Mayong Aditya Pradana (251401125)
5. Alpin Maica Pratama (251401104)

## Menjalankan secara lokal

```bash
npm install
npm run dev      # http://localhost:5173/
```

## Build production

```bash
npm run build    # hasil ada di folder dist/
npm run preview  # cek hasil build di http://localhost:4173/Skillup-Academy/
```

## Deploy ke GitHub Pages

Repo ini di-deploy otomatis lewat GitHub Actions (`.github/workflows/deploy.yml`)
setiap ada push ke branch `main`.

Sekali saja, lakukan di GitHub:

1. Buka **Settings → Pages**.
2. Pada **Build and deployment → Source**, pilih **GitHub Actions**
   (jangan "Deploy from a branch").
3. Push ke `main`, lalu tunggu workflow **Deploy ke GitHub Pages** selesai di tab **Actions**.

Situs akan tersedia di <https://anomaly-develop.github.io/Skillup-Academy/>.

Catatan: `vite.config.js` memakai `base: "/Skillup-Academy/"` saat build.
Kalau nama repo diganti, sesuaikan nilai tersebut (atau pindahkan ke custom domain).

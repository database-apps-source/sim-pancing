# SIM-TOPANCING Bang Zod — Frontend GitHub Pages

Repository: https://github.com/database-apps-source/sim-pancing
Situs setelah Pages aktif: https://database-apps-source.github.io/sim-pancing/

## Isi
- `index.html` di ROOT repo
- `css/style.css`
- `js/config.js`
- `js/app.js`
- `.nojekyll`

## Keamanan dan status
`js/config.js` saat ini memakai `PREVIEW_MODE: true`; halaman adalah PRATINJAU dengan data contoh dan tidak melakukan transaksi nyata. Backend Google Apps Script, rahasia, password, token admin, file `.gs` dan URL internal TIDAK BOLEH dimasukkan ke repository publik. Mode produksi hanya boleh diaktifkan setelah autentikasi, pengamanan CORS/gateway, kontrol akses, dan pengujian transaksi selesai.

## Cara unggah via Git di PowerShell
1. Ekstrak ZIP ini ke sebuah folder. Pastikan `index.html` terlihat di folder itu.
2. Buka PowerShell di folder itu. Periksa `git --version`.
3. Jalankan satu per satu: `git init`; `git add .`; `git commit -m "Frontend preview SIM-TOPANCING"`; `git branch -M main`; `git remote add origin https://github.com/database-apps-source/sim-pancing.git`; `git push -u origin main`.
4. GitHub → repository `sim-pancing` → Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/(root)` → Save.
5. Buka https://database-apps-source.github.io/sim-pancing/ dan verifikasi tampilan.

**Penting:** file `.zip` tidak langsung dijadikan halaman; ekstrak dulu, lalu push isinya.

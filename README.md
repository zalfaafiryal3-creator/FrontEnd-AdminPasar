# Admin Pasar Oro-Oro Dowo

## Menjalankan secara lokal

Persyaratan: Node.js 22.13 atau lebih baru dan backend sudah berjalan di
`http://localhost:4000`.

```powershell
npm install
if (-not (Test-Path .env.local)) { Copy-Item .env.example .env.local }
npm run dev
```

Buka http://localhost:3000. Untuk build production lokal, jalankan
`npm run build`, lalu `npm start`. Jangan jalankan `npm run build` bersamaan
dengan server `npm start`/`npm run dev`; hentikan server lama terlebih dahulu.
Untuk kembali ke mode development, hentikan `npm start` lalu jalankan
`npm run dev`.

`NEXT_PUBLIC_API_URL` pada `.env.local` harus menunjuk ke alamat backend.
Jika backend ada di komputer lain, gunakan alamat IP komputer backend, misalnya
`http://192.168.1.20:4000`, lalu tambahkan origin frontend ke `CORS_ORIGIN`
di `.env` backend. Restart server frontend setelah mengubah file environment.

Login admin menggunakan email dan kata sandi dari backend; halaman login yang
aktif adalah `/login`. Proyek ini tidak mengimplementasikan login Google.
Jika tampilan masih menunjukkan tombol Google atau perubahan lama, berarti
server sedang melayani build sebelumnya. Hentikan server, jalankan ulang
`npm run build`, lalu `npm start` (atau gunakan `npm run dev` untuk development).

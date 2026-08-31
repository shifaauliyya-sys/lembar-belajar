# Ms. Shifa's Teaching Studio

Website worksheet & materi bahasa Inggris. Statis (HTML/CSS/JS biasa), tanpa perlu database atau backend — dihost gratis di Vercel, kode disimpan di GitHub.

## Struktur folder

```
├── index.html              ← halaman utama
├── assets/
│   ├── style.css             ← semua styling (palet: rust orange, hitam, mustard)
│   └── script.js              ← logic filter & render worksheet/game
├── data/
│   └── worksheets.json        ← DAFTAR SEMUA WORKSHEET & GAME (edit file ini tiap nambah konten)
├── pdfs/
│   └── (taruh semua file PDF worksheet di sini)
└── games/
    └── (taruh semua file HTML game interaktif di sini)
```

## Cara nambah worksheet PDF baru

1. Taruh file PDF-nya di folder `pdfs/`. Contoh: `pdfs/past-tense-latihan-1.pdf`
2. Buka `data/worksheets.json`, tambahkan satu entri baru di dalam kurung siku `[ ]`, formatnya:

```json
{
  "title": "Judul Worksheet",
  "description": "Deskripsi singkat 1-2 kalimat.",
  "level": "elementary",
  "cefr": "A1",
  "topic": "grammar",
  "audience": "mandiri",
  "pages": 4,
  "hasAnswerKey": true,
  "file": "pdfs/past-tense-latihan-1.pdf"
}
```

## Cara nambah game interaktif baru

1. Taruh file HTML game-nya (satu file lengkap dengan CSS & JS di dalamnya) di folder `games/`. Contoh: `games/tebak-warna.html`
2. Tambahkan entri di `data/worksheets.json`, formatnya beda sedikit dari worksheet PDF — pakai `"type": "game"` dan **tanpa** field `pages`/`hasAnswerKey`:

```json
{
  "title": "Judul Game",
  "description": "Deskripsi singkat game-nya.",
  "level": "kindergarten",
  "cefr": "Pre-A1",
  "topic": "interactive-games",
  "audience": "both",
  "type": "game",
  "file": "games/tebak-warna.html"
}
```

   Kartu game otomatis nampilin tombol "▶ MAIN SEKARANG" yang buka game di tab baru, bukan tombol download.

## Ketentuan field

   Ketentuan nilai tiap kolom:
   - `level`: `"kindergarten"` / `"elementary"` / `"junior-high"` / `"senior-high"` / `"general"`
   - `cefr`: opsional, contoh `"A1"`, `"A2"`, `"B1"`, `"B2"` — kalau nggak relevan, boleh dihapus baris ini
   - `topic`: `"grammar"` / `"vocabulary"` / `"speaking"` / `"reading"` / `"writing"` / `"games"` (Classroom Games, printable) / `"interactive-games"` (game HTML dimainkan di browser) / `"lesson-plans"` / `"teacher-resources"`
   - `audience`: `"mandiri"` / `"guru"` / `"both"` (`"both"` muncul di dua-duanya)
   - `hasAnswerKey`: `true` kalau ada kunci jawaban, `false` kalau tidak (khusus worksheet PDF)
   - `type`: opsional, isi `"game"` untuk game interaktif. Kalau dikosongkan, dianggap worksheet PDF biasa

3. Jangan lupa kasih **koma** setelah entri sebelumnya kalau nambah di tengah/akhir list (format JSON strict soal ini).
4. Simpan, lalu commit & push ke GitHub — Vercel otomatis deploy ulang dalam hitungan detik.

## Nambah topik atau level baru

Kalau suatu saat mau nambah kategori topik/level baru di luar daftar di atas:
1. Tambahkan chip filter baru di `index.html` (cari bagian `data-filter-group="level"` atau `"topic"`)
2. Kalau itu level baru, tambahkan juga style badge-nya di `assets/style.css` (cari `.badge.kindergarten` dst. sebagai contoh) dan label-nya di `levelLabels` dalam `assets/script.js`

## Palet warna yang dipakai

- Cream (background): `#F7F2E7`
- Hitam/ink (teks, border, chip aktif): `#221D17`
- Rust orange (aksen "untuk guru", elementary, CTA download): `#B14A22` / deep `#7C2E12`
- Mustard (aksen "belajar mandiri", kindergarten, tombol CTA guru): `#EFC13B` / deep `#8A6810`

## Deploy (kalau bikin repo baru dari nol)

1. Bikin akun GitHub → bikin repository baru (public)
2. Upload semua isi folder ini ke repo tersebut
3. Bikin akun Vercel via "Continue with GitHub" di vercel.com/signup
4. "Add New" → "Project" → pilih repo → Framework Preset: **Other** → Deploy

Kalau repo & Vercel project-nya udah ada (dari setup sebelumnya), tinggal timpa file-file lama di GitHub dengan versi baru ini — Vercel otomatis re-deploy.

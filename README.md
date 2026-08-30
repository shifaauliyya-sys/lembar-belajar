# Lembar Belajar

Website worksheet & materi bahasa Inggris. Statis (HTML/CSS/JS biasa), tanpa perlu database atau backend — cocok dihost gratis di GitHub Pages.

## Struktur folder

```
lembar-belajar/
├── index.html              ← halaman utama
├── assets/
│   ├── style.css            ← semua styling
│   └── script.js             ← logic filter & render worksheet
├── data/
│   └── worksheets.json       ← DAFTAR SEMUA WORKSHEET (edit file ini tiap nambah materi)
└── pdfs/
    └── (taruh semua file PDF worksheet di sini)
```

## Cara nambah worksheet baru

1. Taruh file PDF-nya di folder `pdfs/`. Contoh: `pdfs/past-tense-latihan-1.pdf`
2. Buka `data/worksheets.json`, tambahkan satu entri baru di dalam kurung siku `[ ]`, formatnya:

```json
{
  "title": "Judul Worksheet",
  "description": "Deskripsi singkat 1-2 kalimat.",
  "level": "beginner",
  "topic": "grammar",
  "audience": "mandiri",
  "pages": 4,
  "hasAnswerKey": true,
  "file": "pdfs/past-tense-latihan-1.pdf"
}
```

   Ketentuan nilai tiap kolom:
   - `level`: `"beginner"` / `"intermediate"` / `"advanced"`
   - `topic`: `"grammar"` / `"vocabulary"` / `"tenses"` / `"reading"` / `"listening"` (bisa ditambah topik baru, tapi juga perlu ditambahkan chip filternya di `index.html`)
   - `audience`: `"mandiri"` / `"guru"` / `"both"` (`"both"` muncul di dua-duanya)
   - `hasAnswerKey`: `true` kalau ada kunci jawaban, `false` kalau tidak

3. Jangan lupa kasih **koma** setelah entri sebelumnya kalau nambah di tengah/akhir list (format JSON strict soal ini).
4. Simpan, lalu commit & push ke GitHub — website otomatis update.

## Cara deploy ke Vercel (sekali di awal)

Vercel dipilih daripada GitHub Pages karena setup domain lebih gampang dan auto-deploy-nya lebih rapi. Repo tetap disimpan di GitHub — Vercel cuma "nempel" ke situ.

1. Bikin akun GitHub kalau belum punya: https://github.com/signup
2. Bikin repository baru (public), kasih nama misalnya `lembar-belajar`
3. Upload semua isi folder ini ke repo tersebut (drag & drop lewat web GitHub juga bisa, tidak wajib pakai command line)
4. Bikin akun Vercel di https://vercel.com/signup — pilih **"Continue with GitHub"** biar langsung nyambung
5. Di dashboard Vercel, klik **"Add New" → "Project"**
6. Pilih repo `lembar-belajar` yang tadi dibuat → klik **Import**
7. Untuk "Framework Preset", pilih **"Other"** (soalnya ini website statis biasa, bukan React/Next.js) — biarkan Build Command & Output Directory kosong
8. Klik **Deploy**

Tunggu ±30 detik, website akan hidup di URL seperti:
`https://lembar-belajar-<random>.vercel.app`

(Custom domain seperti `.com` sendiri bisa dipasang belakangan lewat Settings → Domains di Vercel, kalau kamu sudah punya domain.)

Setiap kali kamu update `worksheets.json` atau nambah PDF baru lewat GitHub, Vercel otomatis deploy ulang dalam hitungan detik — nggak perlu klik apa-apa lagi di Vercel.

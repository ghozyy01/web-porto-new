# Portfolio Ghozy Alfienno Maulana — Versi Ubuntu Linux

Website portofolio statis (HTML, CSS, JavaScript). Tidak butuh instalasi database
atau backend apa pun — cukup dijalankan lewat **local web server** karena
browser modern memblokir sebagian fitur (seperti fetch/module) jika file HTML
dibuka langsung dengan `file://`.

## Struktur folder

```
portfolio-ghozy/
├── index.html
├── run.sh                 <- script otomatis untuk menjalankan
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
        ├── hero-illustration.png   (placeholder, ganti dengan gambar asli)
        ├── project-1.jpg           (placeholder)
        ├── project-2.jpg           (placeholder)
        └── project-3.jpg           (placeholder)
```

> Catatan: gambar di `assets/images/` saat ini adalah **placeholder** (kotak
> warna biru) karena file gambar asli tidak disertakan. Ganti file-file
> tersebut dengan foto/ilustrasi asli Anda (nama file harus sama persis).

## Cara menjalankan di Ubuntu

### Opsi 1 — Paling gampang, pakai script `run.sh`

```bash
cd portfolio-ghozy
chmod +x run.sh
./run.sh
```

Browser akan otomatis terbuka ke `http://localhost:8000`. Untuk berhenti,
tekan `CTRL + C` di terminal.

### Opsi 2 — Manual pakai Python (biasanya sudah terpasang di Ubuntu)

```bash
cd portfolio-ghozy
python3 -m http.server 8000
```

Lalu buka browser dan akses: **http://localhost:8000**

Kalau `python3` belum ada:
```bash
sudo apt update
sudo apt install python3 -y
```

### Opsi 3 — Pakai Node.js (`http-server` atau `serve`)

```bash
# install Node.js dulu jika belum ada
sudo apt update
sudo apt install nodejs npm -y

# jalankan langsung tanpa install global
cd portfolio-ghozy
npx serve .
```

Lalu buka URL yang muncul di terminal (biasanya `http://localhost:3000`).

### Opsi 4 — Pakai VS Code

1. Buka folder `portfolio-ghozy` di VS Code.
2. Install ekstensi **Live Server**.
3. Klik kanan `index.html` → **Open with Live Server**.

### Opsi 5 — Web server produksi (Nginx), untuk hosting jangka panjang

```bash
sudo apt update
sudo apt install nginx -y

# salin file website ke folder web nginx
sudo cp -r portfolio-ghozy/* /var/www/html/

# restart nginx
sudo systemctl restart nginx
```

Lalu akses lewat `http://localhost` atau `http://<IP-server-Anda>`.

## Kenapa tidak bisa dibuka langsung dengan double-click `index.html`?

Bisa saja dibuka langsung (protokol `file://`) dan sebagian besar tampilan
akan tetap bekerja karena situs ini murni HTML/CSS/JS statis. Tapi disarankan
tetap pakai local server (Opsi 1–4) karena:
- Beberapa browser membatasi permintaan lintas-file (CORS) lewat `file://`.
- Lebih mirip dengan kondisi saat website sungguhan sudah online.

## Mengedit konten

- **Teks & struktur**: edit `index.html`.
- **Tampilan/warna/tema**: edit `css/style.css` (variabel warna ada di bagian
  `:root` paling atas file, contoh `--primary: #2563eb;`).
- **Interaksi (menu mobile, smooth scroll, form kontak, dsb.)**: edit `js/script.js`.
- **Ganti foto**: timpa file di `assets/images/` dengan nama file yang sama.

## Dependensi eksternal (via internet)

Website ini memuat 2 resource dari CDN saat dibuka, jadi **butuh koneksi
internet** agar tampilan font & ikon muncul sempurna:
- Google Fonts (`Inter`)
- Lucide Icons (`unpkg.com/lucide`)

Jika ingin dijalankan 100% offline, unduh font & library tersebut lalu ubah
tag `<link>`/`<script>` di `index.html` agar menunjuk ke file lokal.

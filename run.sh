#!/bin/bash
# ============================================================
# run.sh — Menjalankan portfolio Ghozy di Ubuntu Linux
# ============================================================
# Cara pakai:
#   1. Buka terminal di folder ini
#   2. chmod +x run.sh
#   3. ./run.sh
#
# Script ini akan menyalakan local web server di port 8000
# lalu otomatis membuka browser ke http://localhost:8000
# ============================================================

PORT=8000

# Cek apakah Python 3 tersedia (biasanya sudah terpasang di Ubuntu)
if ! command -v python3 &> /dev/null; then
    echo "Python3 tidak ditemukan. Menginstal python3..."
    sudo apt update && sudo apt install -y python3
fi

echo "======================================================"
echo " Menjalankan server di http://localhost:$PORT"
echo " Tekan CTRL + C di terminal ini untuk menghentikan server"
echo "======================================================"

# Buka browser default setelah 1.5 detik (opsional, boleh gagal diam-diam)
( sleep 1.5 && xdg-open "http://localhost:$PORT" >/dev/null 2>&1 ) &

# Jalankan server HTTP sederhana dari Python
python3 -m http.server "$PORT"

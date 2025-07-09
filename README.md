
## Cara Menjalankan Proyek

### 1. Clone Proyek & Install Dependency

```bash
git clone https://github.com/nama-anda/fitlife-app.git
cd fitlife-app
npm install
```

### 2. Jalankan json-server

```bash
npx json-server --watch db.json --port 3000
```

> Pastikan `db.json` berada di root direktori proyek.

### 3. Jalankan Aplikasi Vue

```bash
npm run dev
```

---

## ⚠️ Catatan

- Jangan buka `db.json` di editor saat `json-server` sedang aktif.
- Fitur update akun hanya berjalan jika `PATCH` diizinkan oleh `json-server`.
- Setelah mengubah username/password, data baru akan langsung disimpan ke `db.json`.
- Pastikan `axios` terhubung ke base URL `http://localhost:3000`.

---

## 📌 Lisensi

Proyek ini dilisensikan dengan **MIT License** – Bebas digunakan untuk belajar dan pengembangan pribadi.

---

## 🙌 Kontribusi

Silakan fork proyek dan pull request jika ingin memperbaiki bug atau menambahkan fitur baru.

---

Dibuat dengan ❤️ oleh [Nama Kamu] untuk membantu orang-orang membentuk kebiasaan sehat 🎯

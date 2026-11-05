# Sistem Manajemen Rental Kendaraan - TI21240033

Project ini dibuat oleh:
- **Nama**: Muhammad Saprudin Jaelani
- **NIM**: TI21240033
- **Teknologi**: Node.js, NestJS, TypeScript, Prisma, SQLite, REST API, GraphQL, Apollo

## 1. Persyaratan Sistem
Pastikan komputer Anda sudah terinstal:
- [Node.js](https://nodejs.org/) (versi 18+)
- Visual Studio Code (VS Code)

## 2. Cara Menjalankan Project (Sangat Mudah)

### Langkah 1: Instalasi Dependensi
Buka terminal di dalam folder project ini, lalu jalankan:
```bash
npm install
```

### Langkah 2: Setup Database (Migrasi & Seed)
Untuk membuat database SQLite otomatis dan mengisi data awal (termasuk NIM 033), cukup jalankan:
```bash
npm run setup
```
*(Perintah ini akan menjalankan `prisma generate`, `prisma migrate dev`, dan `prisma seed` secara berurutan).*

### Langkah 3: Jalankan Aplikasi
Jalankan server aplikasi menggunakan mode development:
```bash
npm run start:dev
```

### Langkah 4: Akses Aplikasi
- **REST API URL**: `http://localhost:3000`
- **GraphQL Sandbox URL**: `http://localhost:3000/graphql`

## 3. Fitur Utama
- **REST API**: Create, Read, Delete data penyewaan. Validasi `class-validator` aktif.
- **Logika Bisnis**: Penghitungan total biaya sewa otomatis dan pengecekan bentrok tanggal.
- **GraphQL**: Endpoint GraphQL untuk mengambil ringkasan transaksi.
- **SQLite Database**: Database ringan siap pakai, tidak perlu instal XAMPP/MySQL.

Silakan baca `API-TESTING.md` untuk panduan pengujian menggunakan Postman dan GraphQL Playground.

# Panduan Pengujian API

File ini berisi panduan untuk menguji endpoints REST API dan query GraphQL.
Anda juga dapat mengimpor file `postman_collection.json` ke dalam aplikasi Postman untuk langsung mengujinya!

## 1. Menguji REST API (URL Base: `http://localhost:3000`)

### A. Mendapatkan Daftar Penyewaan
- **Method**: `GET`
- **Endpoint**: `/penyewaan`
- **Fungsi**: Mengembalikan semua transaksi penyewaan beserta profil Pelanggan dan Kendaraan.

### B. Menambahkan Penyewaan Baru
- **Method**: `POST`
- **Endpoint**: `/penyewaan`
- **Headers**: `Content-Type: application/json`
- **Body JSON**:
```json
{
  "pelangganId": 1,
  "kendaraanId": 2,
  "tanggalSewa": "2026-08-01T00:00:00.000Z",
  "tanggalKembali": "2026-08-05T00:00:00.000Z"
}
```
*Catatan: Pastikan kendaraanId = 2 tersedia, jika tidak akan terjadi error Bad Request.*

- **Contoh Error Validasi (Jika tanggal kosong)**:
```json
{
  "message": [
    "tanggalSewa should not be empty",
    "tanggalSewa must be a valid ISO 8601 date string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

### C. Detail Satu Penyewaan
- **Method**: `GET`
- **Endpoint**: `/penyewaan/1`
- **Fungsi**: Mengembalikan detail transaksi ID = 1.
- **Contoh Response**:
```json
{
  "id": 1,
  "pelangganId": 1,
  "kendaraanId": 1,
  "tanggalSewa": "2026-05-01T00:00:00.000Z",
  "tanggalKembali": "2026-05-03T00:00:00.000Z",
  "totalBiaya": 700000,
  "status": "SELESAI",
  "pelanggan": {
    "nama": "Muhammad Saprudin Jaelani 033"
  },
  "kendaraan": {
    "namaKendaraan": "Avanza Veloz 033"
  }
}
```

### D. Menghapus Penyewaan
- **Method**: `DELETE`
- **Endpoint**: `/penyewaan/1`
- **Fungsi**: Menghapus data penyewaan dengan ID 1 dan mengembalikan status kendaraan menjadi `TERSEDIA`.

---

## 2. Menguji GraphQL

- Buka Browser: `http://localhost:3000/graphql`
- Masukkan Query Berikut di Apollo Sandbox:

```graphql
query {
  getSemuaPenyewaan {
    id
    tanggal_sewa
    total_biaya
    nama_pelanggan
    merek_kendaraan
  }
}
```

- **Contoh Hasil**:
```json
{
  "data": {
    "getSemuaPenyewaan": [
      {
        "id": 1,
        "tanggal_sewa": "2026-05-01T00:00:00.000Z",
        "total_biaya": 700000,
        "nama_pelanggan": "Muhammad Saprudin Jaelani 033",
        "merek_kendaraan": "Toyota"
      }
    ]
  }
}
```

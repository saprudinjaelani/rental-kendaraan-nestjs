-- CreateTable
CREATE TABLE "Pelanggan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "nomorHp" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Kendaraan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "namaKendaraan" TEXT NOT NULL,
    "merek" TEXT NOT NULL,
    "nomorPlat" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "hargaSewaPerHari" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'TERSEDIA',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Penyewaan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pelangganId" INTEGER NOT NULL,
    "kendaraanId" INTEGER NOT NULL,
    "tanggalSewa" DATETIME NOT NULL,
    "tanggalKembali" DATETIME NOT NULL,
    "totalBiaya" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AKTIF',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Penyewaan_pelangganId_fkey" FOREIGN KEY ("pelangganId") REFERENCES "Pelanggan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Penyewaan_kendaraanId_fkey" FOREIGN KEY ("kendaraanId") REFERENCES "Kendaraan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

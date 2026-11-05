import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Menghapus data lama...');
  await prisma.penyewaan.deleteMany();
  await prisma.pelanggan.deleteMany();
  await prisma.kendaraan.deleteMany();

  console.log('Memasukkan data Pelanggan...');
  const p1 = await prisma.pelanggan.create({
    data: {
      nama: 'Muhammad Saprudin Jaelani 033',
      alamat: 'Jl. Pendidikan No. 033, Mataram',
      nomorHp: '081234567033'
    }
  });
  const p2 = await prisma.pelanggan.create({
    data: {
      nama: 'Andi Budianto',
      alamat: 'Jl. Rinjani No. 12, Lombok Barat',
      nomorHp: '089876543210'
    }
  });
  const p3 = await prisma.pelanggan.create({
    data: {
      nama: 'Siti Aisyah 033',
      alamat: 'Jl. Senggigi Raya 033',
      nomorHp: '081112223033'
    }
  });

  console.log('Memasukkan data Kendaraan...');
  const k1 = await prisma.kendaraan.create({
    data: {
      namaKendaraan: 'Avanza Veloz 033',
      merek: 'Toyota',
      nomorPlat: 'DR 1033 AB',
      tahun: 2022,
      hargaSewaPerHari: 350000,
      status: 'TERSEDIA'
    }
  });
  const k2 = await prisma.kendaraan.create({
    data: {
      namaKendaraan: 'Innova Reborn',
      merek: 'Toyota',
      nomorPlat: 'DR 2024 CD',
      tahun: 2023,
      hargaSewaPerHari: 500000,
      status: 'TERSEDIA'
    }
  });
  const k3 = await prisma.kendaraan.create({
    data: {
      namaKendaraan: 'Civic Turbo 033',
      merek: 'Honda',
      nomorPlat: 'DR 3033 EF',
      tahun: 2024,
      hargaSewaPerHari: 750000,
      status: 'DISEWA'
    }
  });

  console.log('Memasukkan data Penyewaan...');
  await prisma.penyewaan.create({
    data: {
      pelangganId: p1.id,
      kendaraanId: k1.id,
      tanggalSewa: new Date('2026-05-01T00:00:00.000Z'),
      tanggalKembali: new Date('2026-05-03T00:00:00.000Z'),
      totalBiaya: 700000,
      status: 'SELESAI'
    }
  });
  await prisma.penyewaan.create({
    data: {
      pelangganId: p2.id,
      kendaraanId: k2.id,
      tanggalSewa: new Date('2026-06-10T00:00:00.000Z'),
      tanggalKembali: new Date('2026-06-12T00:00:00.000Z'),
      totalBiaya: 1000000,
      status: 'SELESAI'
    }
  });
  await prisma.penyewaan.create({
    data: {
      pelangganId: p3.id,
      kendaraanId: k3.id,
      tanggalSewa: new Date(),
      tanggalKembali: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 hari dari sekarang
      totalBiaya: 1500000,
      status: 'AKTIF'
    }
  });

  console.log('Seed data berhasil dimasukkan! (Termasuk kode NIM 033)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

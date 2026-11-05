import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto';

@Injectable()
export class PenyewaanService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePenyewaanDto) {
    const tanggalSewa = new Date(dto.tanggalSewa);
    const tanggalKembali = new Date(dto.tanggalKembali);

    if (tanggalKembali < tanggalSewa) {
      throw new BadRequestException('Tanggal kembali tidak boleh lebih awal dari tanggal sewa');
    }

    const kendaraan = await this.prisma.kendaraan.findUnique({ where: { id: dto.kendaraanId } });
    if (!kendaraan) throw new NotFoundException('Kendaraan tidak ditemukan');
    if (kendaraan.status !== 'TERSEDIA') {
      throw new BadRequestException('Kendaraan sedang disewa atau tidak tersedia');
    }

    const pelanggan = await this.prisma.pelanggan.findUnique({ where: { id: dto.pelangganId } });
    if (!pelanggan) throw new NotFoundException('Pelanggan tidak ditemukan');

    // Menghitung hari (minimal 1 hari)
    const diffTime = Math.abs(tanggalKembali.getTime() - tanggalSewa.getTime());
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) diffDays = 1;

    const totalBiaya = diffDays * kendaraan.hargaSewaPerHari;

    const penyewaan = await this.prisma.penyewaan.create({
      data: {
        pelangganId: dto.pelangganId,
        kendaraanId: dto.kendaraanId,
        tanggalSewa: tanggalSewa,
        tanggalKembali: tanggalKembali,
        totalBiaya: totalBiaya,
        status: 'AKTIF'
      },
    });

    // Update status kendaraan
    await this.prisma.kendaraan.update({
      where: { id: dto.kendaraanId },
      data: { status: 'DISEWA' },
    });

    return penyewaan;
  }

  async findAll() {
    return this.prisma.penyewaan.findMany({
      include: { pelanggan: true, kendaraan: true },
    });
  }

  async findOne(id: number) {
    const penyewaan = await this.prisma.penyewaan.findUnique({
      where: { id },
      include: { pelanggan: true, kendaraan: true },
    });

    if (!penyewaan) throw new NotFoundException(`Penyewaan dengan ID ${id} tidak ditemukan`);
    return penyewaan;
  }

  async remove(id: number) {
    const penyewaan = await this.prisma.penyewaan.findUnique({ where: { id } });
    if (!penyewaan) throw new NotFoundException(`Penyewaan dengan ID ${id} tidak ditemukan`);

    // Kembalikan status kendaraan menjadi TERSEDIA
    await this.prisma.kendaraan.update({
      where: { id: penyewaan.kendaraanId },
      data: { status: 'TERSEDIA' },
    });

    return this.prisma.penyewaan.delete({
      where: { id },
    });
  }
}

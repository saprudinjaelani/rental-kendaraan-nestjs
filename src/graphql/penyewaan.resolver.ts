import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { PenyewaanType } from './penyewaan.type';

@Resolver(() => PenyewaanType)
export class PenyewaanResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [PenyewaanType])
  async getSemuaPenyewaan() {
    const data = await this.prisma.penyewaan.findMany({
      include: { pelanggan: true, kendaraan: true },
    });

    return data.map((item) => ({
      id: item.id,
      tanggal_sewa: item.tanggalSewa.toISOString(),
      total_biaya: item.totalBiaya,
      nama_pelanggan: item.pelanggan.nama,
      merek_kendaraan: item.kendaraan.merek,
    }));
  }
}

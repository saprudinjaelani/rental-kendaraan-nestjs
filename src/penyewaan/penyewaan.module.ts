import { Module } from '@nestjs/common';
import { PenyewaanService } from './penyewaan.service';
import { PenyewaanController } from './penyewaan.controller';

@Module({
  controllers: [PenyewaanController],
  providers: [PenyewaanService],
})
export class PenyewaanModule {}

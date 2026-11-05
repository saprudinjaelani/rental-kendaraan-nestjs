import { Module } from '@nestjs/common';
import { PenyewaanResolver } from './penyewaan.resolver';

@Module({
  providers: [PenyewaanResolver],
})
export class GraphqlModule {}

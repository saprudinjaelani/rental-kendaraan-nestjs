import { IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePenyewaanDto {
  @IsInt()
  @IsNotEmpty()
  pelangganId: number;

  @IsInt()
  @IsNotEmpty()
  kendaraanId: number;

  @IsDateString()
  @IsNotEmpty()
  tanggalSewa: string;

  @IsDateString()
  @IsNotEmpty()
  tanggalKembali: string;
}

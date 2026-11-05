import { Field, Int, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class PenyewaanType {
  @Field(() => Int)
  id: number;

  @Field()
  tanggal_sewa: string;

  @Field(() => Float)
  total_biaya: number;

  @Field()
  nama_pelanggan: string;

  @Field()
  merek_kendaraan: string;
}

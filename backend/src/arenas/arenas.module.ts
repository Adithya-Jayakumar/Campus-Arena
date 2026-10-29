import { Module } from '@nestjs/common';
import { ArenasService } from './arenas.service';
import { ArenasController } from './arenas.controller';
import { ArenasResolver } from './arenas.resolver';

@Module({
  controllers: [ArenasController],
  providers: [ArenasService, ArenasResolver],
  exports: [ArenasService],
})
export class ArenasModule {}

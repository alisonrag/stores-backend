import { Module } from '@nestjs/common';
import { UpdateTimesService } from './update_times.service';
import { UpdateTimesController } from './update_times.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UpdateTimesController],
  providers: [UpdateTimesService],
})
export class UpdateTimesModule { }

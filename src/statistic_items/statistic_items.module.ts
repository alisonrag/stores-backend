import { Module } from '@nestjs/common';
import { StatisticItemsService } from './statistic_items.service';
import { StatisticItemsController } from './statistic_items.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StatisticItemsController],
  providers: [StatisticItemsService],
})
export class StatisticItemsModule { }

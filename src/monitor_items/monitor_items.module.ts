import { Module } from '@nestjs/common';
import { MonitorItemsService } from './monitor_items.service';
import { MonitorItemsController } from './monitor_items.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MonitorItemsController],
  providers: [MonitorItemsService],
})
export class MonitorItemsModule { }

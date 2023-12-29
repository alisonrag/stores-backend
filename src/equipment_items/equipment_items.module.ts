import { Module } from '@nestjs/common';
import { EquipmentItemsService } from './equipment_items.service';
import { EquipmentItemsController } from './equipment_items.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [EquipmentItemsController],
  imports: [DatabaseModule],
  providers: [EquipmentItemsService],
})
export class EquipmentItemsModule { }

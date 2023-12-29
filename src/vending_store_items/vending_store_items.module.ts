import { Module } from '@nestjs/common';
import { VendingStoreItemsService } from './vending_store_items.service';
import { VendingStoreItemsController } from './vending_store_items.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VendingStoreItemsController],
  providers: [VendingStoreItemsService],
})
export class VendingStoreItemsModule { }

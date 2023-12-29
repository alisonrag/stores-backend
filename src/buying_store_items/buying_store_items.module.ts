import { Module } from '@nestjs/common';
import { BuyingStoreItemsService } from './buying_store_items.service';
import { BuyingStoreItemsController } from './buying_store_items.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BuyingStoreItemsController],
  providers: [BuyingStoreItemsService],
})
export class BuyingStoreItemsModule { }

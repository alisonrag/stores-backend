import { Module } from '@nestjs/common';
import { BuyingStoresService } from './buying_stores.service';
import { BuyingStoresController } from './buying_stores.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BuyingStoresController],
  providers: [BuyingStoresService],
})
export class BuyingStoresModule { }

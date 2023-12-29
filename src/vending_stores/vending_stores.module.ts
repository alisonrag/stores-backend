import { Module } from '@nestjs/common';
import { VendingStoresService } from './vending_stores.service';
import { VendingStoresController } from './vending_stores.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VendingStoresController],
  providers: [VendingStoresService],
})
export class VendingStoresModule { }

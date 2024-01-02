import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './items/items.module';
import { AccountsModule } from './accounts/accounts.module';
import { CharactersModule } from './characters/characters.module';
import { VendingStoresModule } from './vending_stores/vending_stores.module';
import { VendingStoreItemsModule } from './vending_store_items/vending_store_items.module';
import { BuyingStoresModule } from './buying_stores/buying_stores.module';
import { BuyingStoreItemsModule } from './buying_store_items/buying_store_items.module';
import { ChatsModule } from './chats/chats.module';
import { UpdateTimesModule } from './update_times/update_times.module';
import { MonitorItemsModule } from './monitor_items/monitor_items.module';
import { StatisticItemsModule } from './statistic_items/statistic_items.module';
import { SearchLogsModule } from './search_logs/search_logs.module';
import { EquipmentItemsModule } from './equipment_items/equipment_items.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';


@Module({
  imports: [UsersModule, DatabaseModule, ItemsModule, AccountsModule, CharactersModule, VendingStoresModule, VendingStoreItemsModule, BuyingStoresModule, BuyingStoreItemsModule, ChatsModule, UpdateTimesModule, MonitorItemsModule, StatisticItemsModule, SearchLogsModule, EquipmentItemsModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule {}

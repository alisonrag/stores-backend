import { Module } from '@nestjs/common';
import { SearchLogsService } from './search_logs.service';
import { SearchLogsController } from './search_logs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SearchLogsController],
  providers: [SearchLogsService],
})
export class SearchLogsModule { }

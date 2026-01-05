import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { ListController } from './controllers/list.controller';
import { ListService } from './services/list.service';
import { ListRepository } from './repositories/list.repository';
import { IListRepository } from './repositories/list.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListController],
  providers: [
    ListService,
    {
      provide: IListRepository,
      useClass: ListRepository,
    },
  ],
  exports: [ListService],
})
export class ListModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';
import { ItemRepository } from './repositories/item.repository';
import { IItemRepository } from './repositories/item.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [
    ItemService,
    {
      provide: IItemRepository,
      useClass: ItemRepository,
    },
  ],
  exports: [ItemService],
})
export class ItemModule {}

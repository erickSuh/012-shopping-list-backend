import type { Item } from '../item.entity';
import type { CreateItemDto, UpdateItemDto } from '../dto/item.dto';
export const IItemRepository = Symbol('IItemRepository');
export interface IItemRepository {
  findAll(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  findByListId(listId: number): Promise<Item[]>;
  create(dto: CreateItemDto): Promise<Item>;
  update(id: number, dto: UpdateItemDto): Promise<Item>;
  delete(id: number): Promise<void>;
  deleteByListId(listId: number): Promise<void>;
}

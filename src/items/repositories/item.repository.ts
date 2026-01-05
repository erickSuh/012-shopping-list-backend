import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../item.entity';
import { CreateItemDto, UpdateItemDto } from '../dto/item.dto';
import { IItemRepository } from './item.repository.interface';

@Injectable()
export class ItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.repository.find({
      order: { updatedAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<Item | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findByListId(listId: number): Promise<Item[]> {
    return this.repository.find({
      where: { listId },
      order: { updatedAt: 'DESC' },
    });
  }

  async create(dto: CreateItemDto): Promise<Item> {
    const item = this.repository.create({
      title: dto.title,
      description: dto.description || '',
      quantity: dto.quantity || 1,
      listId: dto.listId,
    });
    return this.repository.save(item);
  }

  async update(id: number, dto: UpdateItemDto): Promise<Item> {
    await this.repository.update(id, dto);
    const updated = await this.findById(id);
    if (!updated) throw new Error(`Item with id ${id} not found`);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByListId(listId: number): Promise<void> {
    await this.repository.delete({ listId });
  }
}

import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { Item } from '../item.entity';
import { CreateItemDto, UpdateItemDto, ItemResponseDto } from '../dto/item.dto';
import { IItemRepository } from '../repositories/item.repository.interface';

@Injectable()
export class ItemService {
  constructor(
    @Inject(IItemRepository) private readonly itemRepository: IItemRepository,
  ) {}

  async getAllItems(): Promise<ItemResponseDto[]> {
    const items = await this.itemRepository.findAll();
    return items.map((item) => this.mapToResponse(item));
  }

  async getItemById(id: number): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findById(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    return this.mapToResponse(item);
  }

  async getItemsByListId(listId: number): Promise<ItemResponseDto[]> {
    const items = await this.itemRepository.findByListId(listId);
    return items.map((item) => this.mapToResponse(item));
  }

  async createItem(dto: CreateItemDto): Promise<ItemResponseDto> {
    const item = await this.itemRepository.create(dto);
    return this.mapToResponse(item);
  }

  async updateItem(id: number, dto: UpdateItemDto): Promise<ItemResponseDto> {
    const item = await this.itemRepository.update(id, dto);
    return this.mapToResponse(item);
  }

  async deleteItem(id: number): Promise<void> {
    const item = await this.itemRepository.findById(id);
    if (!item) throw new NotFoundException(`Item with id ${id} not found`);
    await this.itemRepository.delete(id);
  }

  async deleteItemsByListId(listId: number): Promise<void> {
    await this.itemRepository.deleteByListId(listId);
  }

  private mapToResponse = (item: Item): ItemResponseDto => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      quantity: item.quantity,
      isChecked: item.isChecked,
      listId: item.listId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  };
}

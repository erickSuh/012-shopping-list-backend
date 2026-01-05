import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import type { List } from '../list.entity';
import { CreateListDto, UpdateListDto, ListResponseDto } from '../dto/list.dto';
import { IListRepository } from '../repositories/list.repository.interface';

@Injectable()
export class ListService {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    @Inject(IListRepository) private readonly listRepository: IListRepository,
  ) {}

  async getAllLists(): Promise<ListResponseDto[]> {
    const lists = await this.listRepository.findAll();
    return lists.map((list) => this.mapToResponse(list));
  }

  async getListById(id: number): Promise<ListResponseDto> {
    const list = await this.listRepository.findById(id);
    if (!list) throw new NotFoundException(`List with id ${id} not found`);
    return this.mapToResponse(list);
  }

  async createList(dto: CreateListDto): Promise<ListResponseDto> {
    const list = await this.listRepository.create(dto);
    return this.mapToResponse(list);
  }

  async updateList(id: number, dto: UpdateListDto): Promise<ListResponseDto> {
    const list = await this.listRepository.update(id, dto);
    return this.mapToResponse(list);
  }

  async deleteList(id: number): Promise<void> {
    const list = await this.listRepository.findById(id);
    if (!list) throw new NotFoundException(`List with id ${id} not found`);
    await this.listRepository.delete(id);
  }

  private mapToResponse = (list: List): ListResponseDto => {
    return {
      id: list.id,
      title: list.title,
      description: list.description,
      createdAt: list.createdAt,
      updatedAt: list.updatedAt,
      itemsCount: list.items?.length || 0,
    };
  };
}

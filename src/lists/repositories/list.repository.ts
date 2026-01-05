import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../list.entity';
import { CreateListDto, UpdateListDto } from '../dto/list.dto';
import { IListRepository } from './list.repository.interface';

@Injectable()
export class ListRepository implements IListRepository {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    @InjectRepository(List)
    private readonly repository: Repository<List>,
  ) {}

  async findAll(): Promise<List[]> {
    return this.repository.find({
      relations: ['items'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findById(id: number): Promise<List | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  async create(dto: CreateListDto): Promise<List> {
    const list = this.repository.create({
      title: dto.title,
      description: dto.description || '',
    });
    return this.repository.save(list);
  }

  async update(id: number, dto: UpdateListDto): Promise<List> {
    await this.repository.update(id, dto);
    const updated = await this.findById(id);
    if (!updated) throw new Error(`List with id ${id} not found`);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

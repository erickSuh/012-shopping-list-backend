import type { List } from '../list.entity';
import type { CreateListDto, UpdateListDto } from '../dto/list.dto';
export const IListRepository = Symbol('IListRepository');
export interface IListRepository {
  findAll(): Promise<List[]>;
  findById(id: number): Promise<List | null>;
  create(dto: CreateListDto): Promise<List>;
  update(id: number, dto: UpdateListDto): Promise<List>;
  delete(id: number): Promise<void>;
}

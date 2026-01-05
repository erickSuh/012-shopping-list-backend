export class CreateListDto {
  title: string;
  description?: string;
}

export class UpdateListDto {
  title?: string;
  description?: string;
}

export class ListResponseDto {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  itemsCount?: number;
}

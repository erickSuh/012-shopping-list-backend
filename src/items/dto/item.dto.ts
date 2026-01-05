export class CreateItemDto {
  title: string;
  description?: string;
  quantity?: number;
  listId: number;
}

export class UpdateItemDto {
  title?: string;
  description?: string;
  quantity?: number;
  isChecked?: boolean;
}

export class ItemResponseDto {
  id: number;
  title: string;
  description: string;
  quantity: number;
  isChecked: boolean;
  listId: number;
  createdAt: Date;
  updatedAt: Date;
}

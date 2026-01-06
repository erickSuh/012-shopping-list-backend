import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateListDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
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

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { CreateItemDto, UpdateItemDto, ItemResponseDto } from '../dto/item.dto';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async getAllItems(): Promise<ItemResponseDto[]> {
    return this.itemService.getAllItems();
  }

  @Get('list/:listId')
  async getItemsByListId(
    @Param('listId') listId: number,
  ): Promise<ItemResponseDto[]> {
    return this.itemService.getItemsByListId(listId);
  }

  @Get(':id')
  async getItemById(@Param('id') id: number): Promise<ItemResponseDto> {
    return this.itemService.getItemById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createItem(@Body() dto: CreateItemDto): Promise<ItemResponseDto> {
    return this.itemService.createItem(dto);
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() dto: UpdateItemDto,
  ): Promise<ItemResponseDto> {
    return this.itemService.updateItem(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemService.deleteItem(id);
  }

  @Delete('list/:listId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItemsByListId(@Param('listId') listId: number): Promise<void> {
    return this.itemService.deleteItemsByListId(listId);
  }
}

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
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Auth()
  @Get()
  async getAllItems(): Promise<ItemResponseDto[]> {
    return this.itemService.getAllItems();
  }

  @Auth()
  @Get('list/:listId')
  async getItemsByListId(
    @Param('listId') listId: number,
  ): Promise<ItemResponseDto[]> {
    return this.itemService.getItemsByListId(listId);
  }

  @Auth()
  @Get(':id')
  async getItemById(@Param('id') id: number): Promise<ItemResponseDto> {
    return this.itemService.getItemById(id);
  }

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createItem(@Body() dto: CreateItemDto): Promise<ItemResponseDto> {
    return this.itemService.createItem(dto);
  }

  @Auth()
  @Put(':id')
  async updateItem(
    @Param('id') id: number,
    @Body() dto: UpdateItemDto,
  ): Promise<ItemResponseDto> {
    return this.itemService.updateItem(id, dto);
  }

  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') id: number): Promise<void> {
    return this.itemService.deleteItem(id);
  }

  @Auth()
  @Delete('list/:listId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItemsByListId(@Param('listId') listId: number): Promise<void> {
    return this.itemService.deleteItemsByListId(listId);
  }
}

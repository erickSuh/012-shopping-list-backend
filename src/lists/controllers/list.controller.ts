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
import { ListService } from '../services/list.service';
import { CreateListDto, UpdateListDto, ListResponseDto } from '../dto/list.dto';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getAllLists(): Promise<ListResponseDto[]> {
    return this.listService.getAllLists();
  }

  @Get(':id')
  async getListById(@Param('id') id: number): Promise<ListResponseDto> {
    return this.listService.getListById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createList(@Body() dto: CreateListDto): Promise<ListResponseDto> {
    return this.listService.createList(dto);
  }

  @Put(':id')
  async updateList(
    @Param('id') id: number,
    @Body() dto: UpdateListDto,
  ): Promise<ListResponseDto> {
    return this.listService.updateList(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteList(@Param('id') id: number): Promise<void> {
    return this.listService.deleteList(id);
  }
}

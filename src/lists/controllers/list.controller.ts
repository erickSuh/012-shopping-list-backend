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
import { Auth } from '../../auth/decorators/auth.decorator';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Auth()
  @Get()
  async getAllLists(): Promise<ListResponseDto[]> {
    return this.listService.getAllLists();
  }

  @Auth()
  @Get(':id')
  async getListById(@Param('id') id: number): Promise<ListResponseDto> {
    return this.listService.getListById(id);
  }

  @Auth()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createList(@Body() dto: CreateListDto): Promise<ListResponseDto> {
    return this.listService.createList(dto);
  }

  @Auth()
  @Put(':id')
  async updateList(
    @Param('id') id: number,
    @Body() dto: UpdateListDto,
  ): Promise<ListResponseDto> {
    return this.listService.updateList(id, dto);
  }

  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteList(@Param('id') id: number): Promise<void> {
    return this.listService.deleteList(id);
  }
}

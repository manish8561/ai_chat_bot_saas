import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/helpers/role/role.decorator';
import { Role } from 'src/common/helpers/role/role.enum';
import { CustomRequest } from 'src/common/interfaces';

@ApiBearerAuth()
@ApiTags('Chats')
@Roles(Role.User)
@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto, @Req() req: CustomRequest) {
    return this.chatsService.create(createChatDto, req.user.sub);
  }

  @Get()
  findAll(@Req() req: CustomRequest) {
    return this.chatsService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(+id);
  }
}

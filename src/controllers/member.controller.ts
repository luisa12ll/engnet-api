import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('members')
@ApiBearerAuth() 
@Controller('members')
export class MembersController {

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de membros.' })
  findAll() {
    return [];
  }
}

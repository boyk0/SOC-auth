import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async user(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Post('/signUp')
  async createUser(
    @Body('data') user: { login: string; email: string; password: string },
  ) {
    return await this.userService.createUser(user);
  }
}

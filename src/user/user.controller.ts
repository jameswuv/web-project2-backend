import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}

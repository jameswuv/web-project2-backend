import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUserProfile(@Request() req) {
    const user = await this.userService.findOne(req.user.username);
    user.password = undefined; // Remove password before returning
    return user;
  }
}

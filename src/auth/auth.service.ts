import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (await verify(user.password, pass)) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await verify(user.password, pass))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(createUserDto: CreateUserDto) {
    if (!createUserDto.username || createUserDto.username.length < 4) {
      throw new BadRequestException(
        'Username must be at least 4 characters long',
      );
    }
    if (!createUserDto.password || createUserDto.password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }
    if (
      !createUserDto.email ||
      createUserDto.email.length < 4 ||
      !createUserDto.email.includes('@')
    ) {
      throw new BadRequestException('Invalid email address');
    }
    if (!createUserDto.name || createUserDto.name.length < 3) {
      throw new BadRequestException('name must be at least 3 characters long');
    }
    if (await this.userService.findOne(createUserDto.username)) {
      throw new BadRequestException('Username already exists');
    }

    return this.userService.createUser(createUserDto);
  }
}

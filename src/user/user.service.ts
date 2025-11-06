import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import studentList from './userlist';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = studentList.find(
      (student) =>
        student.username === createUserDto.username &&
        student.email === createUserDto.email,
    );

    if (!user) {
      throw new NotFoundException('User not found in student list');
    }

    const newUser = this.usersRepository.create({
      username: createUserDto.username,
      password: await hash(createUserDto.password),
      email: createUserDto.email,
      name: createUserDto.name,
      course: user.course,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = await this.usersRepository.save(newUser);
    return result;
  }
}

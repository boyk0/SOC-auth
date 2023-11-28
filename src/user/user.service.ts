import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    return user;
  }

  async createUser(user: { login: string; email: string; password: string }) {
    const newUser = await this.userRepository.create({
      login: user.login,
      email: user.email,
      password: user.password,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}

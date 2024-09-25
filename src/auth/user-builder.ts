// user-builder.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBuilder } from './user-builder.interface';

@Injectable()
export class TypeOrmUserBuilder implements UserBuilder {
  private user: User;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.user = new User(); // 빈 사용자 객체 생성
  }

  setUserId(userId: string) {
    this.user.userId = userId;
    return this;
  }

  setName(name: string): this {
    this.user.username = name;
    return this;
  }

  setPassword(password:string): this {
    this.user.password = password;
    return this;
  }

  setPhoneNumber(phoneNumber:string): this {
    this.user.phoneNumber= phoneNumber;
    return this;
  }

  async build(): Promise<void> {
    await this.userRepository.save(this.user);
  }
}

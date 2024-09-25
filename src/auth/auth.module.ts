import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';  // User 엔티티
import { UserRepository } from './user.repository'; // 커스텀 UserRepository 사용
import { TypeOrmUserBuilder } from './user-builder';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, TypeOrmUserBuilder, UserRepository],
  exports: [UserRepository],
})
export class AuthModule {}
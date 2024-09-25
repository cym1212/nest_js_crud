import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signUp.dto';
import { TypeOrmUserBuilder } from './user-builder';
import { BusinessException } from '../exception/business.exception';
import { ErrorCodes } from '../exception/error-codes.enum';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { User } from './user.entity';
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly userBuilder: TypeOrmUserBuilder,
  ) {}

  private readonly saltRounds = 10;

  // 회원가입 로직
  async signup(signUpDto: SignUpDto): Promise<void> {
    const findUser = await this.userRepository.findOne({ where: { userId: signUpDto.userId } });

    if (findUser) {
      throw new BusinessException(ErrorCodes.MEMBER_NOT_FOUND);
    }

    const password = await this.hashPassword(signUpDto.password);

    await this.userBuilder
      .setUserId(signUpDto.userId)
      .setName(signUpDto.name)
      .setPassword(password)
      .setPhoneNumber(signUpDto.phoneNumber)
      .build();
  }

  // 로그인 로직
  async login(loginDto: LoginDto, req: Request): Promise<void> {
    // 사용자가 입력한 userId를 기준으로 User 엔티티 찾기
    const user = await this.userRepository.findOne({ where: { userId: loginDto.userId } });

    if (!user) {
      throw new BusinessException(ErrorCodes.MEMBER_NOT_FOUND);
    }

    const isPasswordValid = await this.comparePassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new BusinessException(ErrorCodes.INVALID_PASSWORD);
    }


    // 세션에 데이터베이스의 자동 생성된 id와 username 저장
    req.session.user = {
      id: user.id,         // 데이터베이스의 id를 세션에 저장
      username: user.username,  // 사용자 이름 저장
    };

    console.log('로그인 성공: 세션에 사용자 정보 저장됨');
  }

  // 로그아웃 로직
  async logout(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          reject(err);
        } else {
          resolve();
          console.log('로그아웃 성공: 세션 삭제됨');
        }
      });
    });
  }

  // 세션에서 사용자 정보 가져오기
  getUserFromSession(req: Request) {
    return req.session.user;
  }

  // 비밀번호 해싱 함수
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds); // 솔트 생성
    return bcrypt.hash(password, salt); // 비밀번호 해싱
  }

  // 비밀번호 비교 함수
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword); // 평문 비밀번호와 해시된 비밀번호 비교
  }
}
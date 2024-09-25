import { Body, Controller, HttpCode, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { SignUpDto } from "./dto/signUp.dto";
import { MessageDto } from "../dto/message.dto";
import { Request } from 'express';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  @ApiOperation({ summary: '회원 가입' }) // 메서드 설명
  @ApiResponse({ status: 201, description: '사용자 생성 성공' }) // 성공 응답 설명
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async signup(@Body() signUpDto: SignUpDto) : Promise<MessageDto> {
    await this.authService.signup(signUpDto);
    return new MessageDto('회원가입 되었습니다.');
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인' }) // 메서드 설명
  @ApiResponse({ status: 201, description: '로그인 성공' }) // 성공 응답 설명
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async login(@Body() loginDto: LoginDto, @Req() req: Request): Promise<MessageDto> {
    await this.authService.login(loginDto, req);
    return new MessageDto('로그인 되었습니다.');
  }
  
  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: '로그아웃' }) // 메서드 설명
  @ApiResponse({ status: 201, description: '로그아웃 성공' }) // 성공 응답 설명
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async logout(@Req() req: Request): Promise<MessageDto> {
    await this.authService.logout(req);
    return new MessageDto('로그아웃 되었습니다.');
  }
}

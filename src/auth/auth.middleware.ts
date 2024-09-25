import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // 세션 존재 여부 확인
    if (!req.session || !req.session.user) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    // todo 보안 문제와 성능 문제의 적정선을 찾아야함
    next();
  }
}
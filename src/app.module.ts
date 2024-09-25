import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './configs/typeorm.config';
import { BoardRepository } from './boards/board.repository';
import { AuthModule } from './auth/auth.module';
import * as session from 'express-session';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserRepository } from './auth/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardRepository, UserRepository]),
    TypeOrmModule.forRoot(typeormConfig),
    BoardsModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: 'your-secret-key',  // 세션 암호화 비밀키
          resave: false,              // 매 요청마다 세션을 다시 저장할지 설정
          saveUninitialized: false,   // 초기화되지 않은 세션을 저장할지 설정
          cookie: {
            maxAge: 1000 * 60 * 60 * 24,  // 세션 쿠키 유효기간 (1일)
            httpOnly: true,              // 클라이언트가 쿠키에 접근하지 못하도록 설정
          },
        }),
      )
      .forRoutes('*');  // 세션 미들웨어가 모든 요청에 적용됨

    // 세션 미들웨어 이후에 AuthMiddleware가 적용되어야 합니다.
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/signUp', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
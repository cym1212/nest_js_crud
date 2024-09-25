import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BusinessExceptionFilter } from "./filters/business-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new BusinessExceptionFilter());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Nest JS')         // API 문서의 제목
    .setDescription('API 설명')  // API 설명
    .setVersion('1.0')          // API 버전
    .addBearerAuth()            // JWT 같은 인증 방식 추가 (선택사항)
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // '/swagger' 경로에 Swagger UI 설정


  await app.listen(3000);
}
bootstrap();

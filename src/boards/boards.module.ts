import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from '../auth/auth.module';
import { BoardRepository } from './board.repository'; // BoardRepository import

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule], // Board 엔티티 등록
  providers: [BoardsService, BoardRepository],   // BoardRepository 명시적으로 등록
  controllers: [BoardsController],
})
export class BoardsModule {}
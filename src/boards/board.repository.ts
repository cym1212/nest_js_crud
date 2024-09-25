import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from '../auth/user.entity';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager()); // 커스텀 리포지토리 방식
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      user,
    });

    await this.save(board); // 게시물 저장
    return board;
  }

  async updateBoard(board: Board, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const { title, description } = updateBoardDto;

    // 새로운 제목과 설명으로 업데이트
    board.title = title;
    board.description = description;

    // 업데이트된 게시물 저장
    await this.save(board);

    return board;
  }
}
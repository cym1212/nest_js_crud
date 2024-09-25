import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BusinessException } from '../exception/business.exception';
import { ErrorCodes } from '../exception/error-codes.enum';
import { UserRepository } from "../auth/user.repository";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { BoardResponseDto } from "./dto/board-response.dto";

@Injectable()
export class BoardsService {
  constructor(
    private boardRepository: BoardRepository,
    private userRepository: UserRepository,
  ) {}

  async getBoardById(id: number): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    return this.toBoardResponseDto(board);
  }

  async createBoard(createBoardDto: CreateBoardDto, sessionUser: { id: number; username: string }): Promise<BoardResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: sessionUser.id } });

    if (!user) {
      throw new Error('User not found');
    }

    const board = await this.boardRepository.createBoard(createBoardDto, user);

    return this.toBoardResponseDto(board);
  }

  async deleteBoard(id: number, sessionUser: { id: number; username: string }): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new BusinessException(ErrorCodes.BOARD_NOT_FOUND);
    }

    if (board.user.id !== sessionUser.id) {
      throw new UnauthorizedException('게시글 작성자만 삭제할 수 있습니다.');
    }

    await this.boardRepository.delete(id);

    // 삭제된 게시물의 정보를 리턴하거나 삭제된 상태를 알리는 메시지를 리턴할 수 있습니다.
    return this.toBoardResponseDto(board);
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto, sessionUser: { id: number; username: string }): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({ where: { id } });

    if (!board) {
      throw new BusinessException(ErrorCodes.BOARD_NOT_FOUND);
    }

    if (board.user.id !== sessionUser.id) {
      throw new UnauthorizedException('게시글 작성자만 수정할 수 있습니다.');
    }

    const updatedBoard = await this.boardRepository.updateBoard(board, updateBoardDto);

    return this.toBoardResponseDto(updatedBoard);
  }

  async getAllBoards(): Promise<BoardResponseDto[]> {
    const boards = await this.boardRepository.find();
    return boards.map((board) => this.toBoardResponseDto(board));
  }

  // Board 엔티티를 BoardResponseDto로 변환
  private toBoardResponseDto(board: Board): BoardResponseDto {
    return {
      id: board.id,
      title: board.title,
      description: board.description,
      username: board.user.username, // 작성자 이름만 포함
    };
  }
}
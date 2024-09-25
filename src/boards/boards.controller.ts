import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Req,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { BoardsService } from './boards.service';

import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";
import { Request } from 'express';
import { UpdateBoardDto } from "./dto/update-board.dto";
import { BoardResponseDto } from "./dto/board-response.dto";

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<BoardResponseDto> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createBoard(@Body() createBoardDto: CreateBoardDto, @Req() req: Request): Promise<BoardResponseDto> {
    const sessionUser = req.session.user;
    return this.boardsService.createBoard(createBoardDto, sessionUser);
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<BoardResponseDto> {
    const sessionUser = req.session.user;
    return this.boardsService.deleteBoard(id, sessionUser);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @Req() req: Request
  ): Promise<BoardResponseDto> {
    const sessionUser = req.session.user;
    return this.boardsService.updateBoard(id, updateBoardDto, sessionUser);
  }

  @Get()
  getAllBoards(): Promise<BoardResponseDto[]> {
    return this.boardsService.getAllBoards();
  }
}
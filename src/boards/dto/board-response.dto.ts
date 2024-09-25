export class BoardResponseDto {
  id: number;
  title: string;
  description: string;
  username: string; // 게시물 작성자 이름만 포함
}
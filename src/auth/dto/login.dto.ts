import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자의 아이디',
  })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '사용자의 비밀번호',
  })
  password: string;


}
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {

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
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자의 이름',
  })
  name: string;
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자의 전화번호',
  })
  phoneNumber: string;
}
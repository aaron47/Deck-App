import { IsNotEmpty, IsString } from 'class-validator';

export class AddCardDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}

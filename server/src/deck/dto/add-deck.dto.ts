import { IsString, IsNotEmpty } from 'class-validator';

export class AddDeckDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString({ each: true })
  @IsNotEmpty()
  cards: string[];
}

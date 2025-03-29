import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Яблоко', description: 'Название продукта' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 99.99, description: 'Цена продукта' })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ example: 'Фрукты', description: 'Категория продукта' })
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @ApiProperty({ example: 'Свежие красные яблоки', description: 'Описание продукта' })
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 100, description: 'Количество на складе' })
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
} 
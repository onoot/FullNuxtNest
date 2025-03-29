import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './schemas/product.schema';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый продукт' })
  @ApiResponse({ status: 201, type: Product })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех продуктов' })
  @ApiResponse({ status: 200, type: [Product] })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  @ApiResponse({ status: 200, type: Product })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить продукт по ID' })
  @ApiResponse({ status: 200, type: Product })
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить продукт по ID' })
  @ApiResponse({ status: 200, type: Product })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
} 
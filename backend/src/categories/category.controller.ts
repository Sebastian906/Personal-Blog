import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoriesService: CategoryService) { }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    async addCategory(@Body() dto: CreateCategoryDto) {
        const category = await this.categoriesService.create(dto);
        return { success: true, message: 'Categoría agregada exitosamente.', category };
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async getAllCategory() {
        const categories = await this.categoriesService.findAll();
        return { success: true, categories };
    }

    @Get('show/:categoryId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    async showCategory(@Param('categoryId') categoryId: string) {
        const category = await this.categoriesService.findById(categoryId);
        return { success: true, category };
    }

    @Put('update/:categoryId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    async updateCategory(
        @Param('categoryId') categoryId: string,
        @Body() dto: UpdateCategoryDto,
    ) {
        const category = await this.categoriesService.updateById(categoryId, dto);
        return { success: true, message: 'Categoría actualizada exitosamente.', category };
    }

    @Delete('delete/:categoryId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AdminGuard)
    async deleteCategory(@Param('categoryId') categoryId: string) {
        await this.categoriesService.deleteById(categoryId);
        return { success: true, message: 'Categoría eliminada exitosamente.' };
    }
}

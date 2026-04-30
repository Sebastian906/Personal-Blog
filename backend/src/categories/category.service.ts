import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    ) { }

    async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
        try {
            const existing = await this.categoryModel.findOne({ slug: dto.slug });
            if (existing) {
                throw new ConflictException('Ya existe una categoría con esa ficha (slug).');
            }

            const category = new this.categoryModel(dto);
            return await category.save();
        } catch (error) {
            if (error instanceof ConflictException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async findAll(): Promise<CategoryDocument[]> {
        try {
            return await this.categoryModel.find().sort({ name: 1 }).lean().exec();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async findById(categoryId: string): Promise<CategoryDocument> {
        try {
            const category = await this.categoryModel.findById(categoryId);
            if (!category) {
                throw new NotFoundException('Datos no encontrados.');
            }
            return category;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async updateById(categoryId: string, dto: UpdateCategoryDto): Promise<CategoryDocument> {
        try {
            const category = await this.categoryModel.findByIdAndUpdate(
                categoryId,
                dto,
                { new: true },
            );
            if (!category) {
                throw new NotFoundException('Datos no encontrados.');
            }
            return category;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async deleteById(categoryId: string): Promise<void> {
        try {
            const category = await this.categoryModel.findByIdAndDelete(categoryId);
            if (!category) {
                throw new NotFoundException('Datos no encontrados.');
            }
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }
}

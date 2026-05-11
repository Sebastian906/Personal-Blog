import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { cloudinary } from '../config/cloudinary.config';
import { encode } from 'entities';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Category, CategoryDocument } from 'src/categories/schemas/category.schema';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    ) { }

    async create(dto: CreateBlogDto, file?: Express.Multer.File): Promise<BlogDocument> {
        try {
            const existing = await this.blogModel.findOne({ slug: dto.slug });
            if (existing) {
                throw new ConflictException('Ya existe un blog con esa ficha (slug).');
            }

            let featuredImage = '';
            if (file) {
                const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: 'Personal-Blog', resource_type: 'auto' },
                        (error, result) => {
                            if (error || !result) return reject(error);
                            resolve(result);
                        },
                    ).end(file.buffer);
                });
                featuredImage = uploaded.secure_url;
            }

            const blog = new this.blogModel({
                ...dto,
                blogContent: encode(dto.blogContent),
                featuredImage,
            });

            return await blog.save();
        } catch (error) {
            if (error instanceof ConflictException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async findAll(): Promise<BlogDocument[]> {
        try {
            return await this.blogModel
                .find()
                .populate('author', 'name avatar role')
                .populate('category', 'name slug')
                .sort({ createdAt: -1 })
                .lean()
                .exec();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async findById(blogId: string): Promise<BlogDocument> {
        try {
            const blog = await this.blogModel
                .findById(blogId)
                .populate('author', 'name avatar role')
                .populate('category', 'name slug');
            if (!blog) {
                throw new NotFoundException('Datos no encontrados.');
            }
            return blog;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async updateById(blogId: string, dto: UpdateBlogDto, file?: Express.Multer.File): Promise<BlogDocument> {
        try {
            const blog = await this.blogModel.findById(blogId);
            if (!blog) {
                throw new NotFoundException('Datos no encontrados.');
            }

            if (dto.category !== undefined) blog.category = new Types.ObjectId(dto.category);
            if (dto.title !== undefined) blog.title = dto.title;
            if (dto.slug !== undefined) blog.slug = dto.slug;
            if (dto.blogContent !== undefined) blog.blogContent = encode(dto.blogContent);

            if (file) {
                const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { folder: 'Personal-Blog', resource_type: 'auto' },
                        (error, result) => {
                            if (error || !result) return reject(error);
                            resolve(result);
                        },
                    ).end(file.buffer);
                });
                blog.featuredImage = uploaded.secure_url;
            }

            return await blog.save();
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async deleteById(blogId: string): Promise<void> {
        try {
            const blog = await this.blogModel.findByIdAndDelete(blogId);
            if (!blog) {
                throw new NotFoundException('Datos no encontrados.');
            }
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async findBySlug(slug: string): Promise<BlogDocument> {
        try {
            const blog = await this.blogModel
                .findOne({ slug })
                .populate('author', 'name avatar role')
                .populate('category', 'name slug');
            if (!blog) {
                throw new NotFoundException('Datos no encontrados.');
            }
            return blog;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }


    async findRelated(categorySlug: string, currentSlug: string): Promise<BlogDocument[]> {
        try {
            const category = await this.categoryModel.findOne({ slug: categorySlug }).lean();
            if (!category) {
                throw new NotFoundException('Categoría no encontrada.');
            }

            const categoryId = category._id.toString();

            return await this.blogModel
                .find({
                    $expr: {
                        $and: [
                            { $eq: [{ $toString: '$category' }, categoryId] },
                            { $ne: ['$slug', currentSlug] },
                        ],
                    },
                })
                .sort({ createdAt: 1 })
                .populate('author', 'name avatar role')
                .populate('category', 'name slug')
                .lean()
                .exec();
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async findByCategory(categorySlug: string): Promise<{ blogs: BlogDocument[]; categoryData: CategoryDocument }> {
        try {
            const categoryData = await this.categoryModel.findOne({ slug: categorySlug }).lean();
            if (!categoryData) {
                throw new NotFoundException('Datos de la categoría no encontrados.');
            }

            const categoryId = categoryData._id.toString();

            const blogs = await this.blogModel
                .find({
                    $expr: {
                        $eq: [{ $toString: '$category' }, categoryId],
                    },
                })
                .populate('author', 'name avatar role')
                .populate('category', 'name slug')
                .sort({ createdAt: -1 })
                .lean()
                .exec();

            return { blogs, categoryData };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async search(q: string): Promise<BlogDocument[]> {
        try {
            return await this.blogModel
                .find({ title: { $regex: q, $options: 'i' } })
                .populate('author', 'name avatar role')
                .populate('category', 'name slug')
                .sort({ createdAt: -1 })
                .lean()
                .exec();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }
}

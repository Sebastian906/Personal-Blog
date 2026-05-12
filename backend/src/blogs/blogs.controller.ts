import {
    Body, Controller, HttpCode, HttpStatus, Post, UploadedFile,
    UseInterceptors, BadRequestException, Get, Param, Put, Delete,
    Query, UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ImageFileInterceptor } from '../common/interceptors/file-upload.interceptor';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogService: BlogsService) { }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ImageFileInterceptor())
    async addBlog(
        @Body() body: any,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const dto = await this.parseAndValidate(CreateBlogDto, body.data);
        const blog = await this.blogService.create(dto, file);
        return { success: true, message: 'Blog agregado exitosamente.', blog };
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    async showAllBlogs() {
        const blogs = await this.blogService.findAll();
        return { success: true, blogs };
    }

    @Get('search')
    @HttpCode(HttpStatus.OK)
    async searchBlogs(@Query('q') q: string) {
        const blogs = await this.blogService.search(q ?? '');
        return { success: true, blogs };
    }

    @Get('get-blog/:slug')
    @HttpCode(HttpStatus.OK)
    async getBlog(@Param('slug') slug: string) {
        const blog = await this.blogService.findBySlug(slug);
        return { success: true, blog };
    }

    @Get('show/:blogId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async showBlog(@Param('blogId') blogId: string) {
        const blog = await this.blogService.findById(blogId);
        return { success: true, blog };
    }

    @Put('update/:blogId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ImageFileInterceptor())
    async updateBlog(
        @Param('blogId') blogId: string,
        @Body() body: any,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        const dto = await this.parseAndValidate(UpdateBlogDto, body.data);
        const blog = await this.blogService.updateById(blogId, dto, file);
        return { success: true, message: 'Blog actualizado exitosamente.', blog };
    }

    @Delete('delete/:blogId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async deleteBlog(@Param('blogId') blogId: string) {
        await this.blogService.deleteById(blogId);
        return { success: true, message: 'Blog eliminado correctamente.' };
    }

    private async parseAndValidate<T extends object>(
        cls: new () => T,
        rawData: any,
    ): Promise<T> {
        let parsed: unknown;
        try {
            const str = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);
            parsed = JSON.parse(str);
        } catch {
            throw new BadRequestException('El campo data no es un JSON válido.');
        }

        const dto = plainToClass(cls, parsed);
        const errors = await validate(dto as object);
        if (errors.length > 0) {
            const messages = errors
                .map(e => Object.values(e.constraints || {}).join(', '))
                .join('; ');
            throw new BadRequestException(messages);
        }
        return dto;
    }

    @Get('get-related-blogs/:category/:blog')
    @HttpCode(HttpStatus.OK)
    async getRelatedBlogs(
        @Param('category') category: string,
        @Param('blog') blog: string,
    ) {
        const relatedBlog = await this.blogService.findRelated(category, blog);
        return { success: true, relatedBlog };
    }

    @Get('get-blog-by-category/:category')
    @HttpCode(HttpStatus.OK)
    async getBlogByCategory(@Param('category') category: string) {
        const result = await this.blogService.findByCategory(category);
        return { success: true, ...result };
    }
}
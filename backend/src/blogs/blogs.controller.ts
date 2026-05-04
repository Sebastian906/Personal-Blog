import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Param, Put, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ImageFileInterceptor } from '../common/interceptors/file-upload.interceptor';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {constructor(private readonly blogService: BlogsService) { }

    @Post('add')
    @HttpCode(HttpStatus.OK)
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

    @Get('show/:blogId')
    @HttpCode(HttpStatus.OK)
    async showBlog(@Param('blogId') blogId: string) {
        const blog = await this.blogService.findById(blogId);
        return { success: true, blog };
    }

    @Put('update/:blogId')
    @HttpCode(HttpStatus.OK)
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
    async deleteBlog(@Param('blogId') blogId: string) {
        await this.blogService.deleteById(blogId);
        return { success: true, message: 'Blog eliminado correctamente.' };
    }

    // Método privado reutilizable para parsear y validar el campo 'data'
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
}

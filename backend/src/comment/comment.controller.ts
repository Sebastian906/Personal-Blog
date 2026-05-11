import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentsService: CommentService) { }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    async addComment(@Body() dto: CreateCommentDto) {
        const comment = await this.commentsService.create(dto);
        return { success: true, message: 'Comentario publicado.', comment };
    }

    @Get('get/:blogId')
    @HttpCode(HttpStatus.OK)
    async getComments(@Param('blogId') blogId: string) {
        const comments = await this.commentsService.findByBlogId(blogId);
        return { success: true, comments };
    }

    @Get('get-count/:blogId')
    @HttpCode(HttpStatus.OK)
    async getCommentCount(@Param('blogId') blogId: string) {
        const commentCount = await this.commentsService.countByBlogId(blogId);
        return { success: true, commentCount };
    }

    @Delete('delete/:commentId')
    @HttpCode(HttpStatus.OK)
    async deleteComment(@Param('commentId') commentId: string) {
        await this.commentsService.deleteById(commentId);
        return { success: true, message: 'Comentario eliminado.' };
    }

    @Get('get-all-comments')
    @HttpCode(HttpStatus.OK)
    async getAllComments() {
        const comments = await this.commentsService.findAll();
        return { success: true, comments };
    }
}

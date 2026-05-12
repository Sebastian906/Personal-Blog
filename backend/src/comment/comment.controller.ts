import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import * as currentUserDecorator from '../common/decorators/current-user.decorator';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentsService: CommentService) { }

    @Post('add')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async deleteComment(@Param('commentId') commentId: string) {
        await this.commentsService.deleteById(commentId);
        return { success: true, message: 'Comentario eliminado.' };
    }

    @Get('get-all-comments')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async getAllComments(@currentUserDecorator.CurrentUser() user: currentUserDecorator.JwtPayload) {
        const comments = await this.commentsService.findAll(user);
        return { success: true, comments };
    }
}
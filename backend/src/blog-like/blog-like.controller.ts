import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { DoLikeDto } from './dto/do-like.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('blog-like')
export class BlogLikeController {
    constructor(private readonly blogLikeService: BlogLikeService) { }

    @Post('do-like')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    async doLike(@Body() dto: DoLikeDto) {
        return this.blogLikeService.doLike(dto);
    }

    @Get('get-like/:blogId/:userId')
    @HttpCode(HttpStatus.OK)
    async getLikeCountWithUser(
        @Param('blogId') blogId: string,
        @Param('userId') userId: string,
    ) {
        return this.blogLikeService.getLikeCount(blogId, userId);
    }

    @Get('get-like/:blogId')
    @HttpCode(HttpStatus.OK)
    async getLikeCount(
        @Param('blogId') blogId: string,
    ) {
        return this.blogLikeService.getLikeCount(blogId);
    }
}

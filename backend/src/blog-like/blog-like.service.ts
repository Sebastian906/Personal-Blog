import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogLike, BlogLikeDocument } from './schemas/blog-like.schema';
import { Model } from 'mongoose';
import { DoLikeDto } from './dto/do-like.dto';

@Injectable()
export class BlogLikeService {
    constructor(
        @InjectModel(BlogLike.name) private blogLikeModel: Model<BlogLikeDocument>,
    ) { }

    async doLike(dto: DoLikeDto): Promise<{ likeCount: number }> {
        try {
            const existing = await this.blogLikeModel.findOne({
                user: dto.user,
                blogId: dto.blogId,
            });

            if (!existing) {
                await this.blogLikeModel.create(dto);
            } else {
                await this.blogLikeModel.findByIdAndDelete(existing._id);
            }

            const likeCount = await this.blogLikeModel.countDocuments({ blogId: dto.blogId });
            return { likeCount };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async getLikeCount(
        blogId: string,
        userId?: string,
    ): Promise<{ likeCount: number; isUserLiked: boolean }> {
        try {
            const likeCount = await this.blogLikeModel.countDocuments({ blogId });

            let isUserLiked = false;
            if (userId) {
                const userLike = await this.blogLikeModel.countDocuments({ blogId, user: userId });
                isUserLiked = userLike > 0;
            }

            return { likeCount, isUserLiked };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) { }

    async create(dto: CreateCommentDto): Promise<CommentDocument> {
        try {
            const comment = new this.commentModel(dto);
            return await comment.save();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async findByBlogId(blogId: string): Promise<CommentDocument[]> {
        try {
            return await this.commentModel
                .find({ blogId })
                .populate('author', 'name avatar role')
                .sort({ createdAt: -1 })
                .lean()
                .exec();
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async deleteById(commentId: string): Promise<void> {
        try {
            const comment = await this.commentModel.findByIdAndDelete(commentId);
            if (!comment) throw new NotFoundException('Comentario no encontrado.');
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async countByBlogId(blogId: string): Promise<number> {
        try {
            return await this.commentModel.countDocuments({ blogId });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }
}

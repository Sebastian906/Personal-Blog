import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true, collection: 'comments' })
export class Comment {
    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    author: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Blog' })
    blogId: Types.ObjectId;

    @Prop({ type: String, required: true, trim: true })
    comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
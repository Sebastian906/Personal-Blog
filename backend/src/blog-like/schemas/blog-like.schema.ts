import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BlogLikeDocument = HydratedDocument<BlogLike>;

@Schema({ timestamps: true, collection: 'bloglikes' })
export class BlogLike {
    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Blog' })
    blogId: Types.ObjectId;
}

export const BlogLikeSchema = SchemaFactory.createForClass(BlogLike);
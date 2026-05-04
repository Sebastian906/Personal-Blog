import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true, collection: 'blogs' })
export class Blog {
    @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
    author: Types.ObjectId;

    @Prop({ type: Types.ObjectId, required: true, ref: 'Category' })
    category: Types.ObjectId;

    @Prop({ type: String, required: true, trim: true })
    title: string;

    @Prop({ type: String, required: true, unique: true, trim: true })
    slug: string;

    @Prop({ type: String, required: true, trim: true })
    blogContent: string;

    @Prop({ type: String, required: true, trim: true })
    featuredImage: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
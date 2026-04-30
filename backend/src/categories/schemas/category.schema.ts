import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    timestamps: true,
    collection: 'categories',
})
export class Category {
    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    name: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
    })
    slug: string;

    @Prop({
        type: String,
        trim: true,
        default: null,
    })
    icon?: string; 
}

export const CategorySchema = SchemaFactory.createForClass(Category);
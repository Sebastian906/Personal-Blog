import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    collection: 'users',
})
export class User {
    @Prop({
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true,
        trim: true,
    })
    role!: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
    })
    name!: string;

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
    })
    email!: string;

    @Prop({
        type: String,
        trim: true,
    })
    bio!: string;

    @Prop({
        type: String,
        trim: true,
    })
    avatar!: string;

    @Prop({
        type: String,
        trim: true,
        // select: false, // Útil si quieres que el password no se incluya en las consultas por defecto
    })
    password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
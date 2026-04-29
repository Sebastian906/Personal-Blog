import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { cloudinary } from '../config/cloudinary.config';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly configService: ConfigService,
    ) {
        const { createCloudinaryConfig } = require('../config/cloudinary.config');
        createCloudinaryConfig(configService);
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email });
    }

    async findById(userId: string): Promise<UserDocument | null> {
        return this.userModel.findById(userId).exec();
    }

    async create(data: {
        name: string;
        email: string;
        password: string;
        avatar?: string;
    }): Promise<UserDocument> {
        const user = new this.userModel(data);
        return user.save();
    }

    async updateById(
        userId: string,
        dto: UpdateUserDto,
        file?: Express.Multer.File,
    ): Promise<Omit<UserDocument, 'password'> | null> {
        const user = await this.userModel.findById(userId);
        if (!user) return null;

        if (dto.name !== undefined) user.name = dto.name;
        if (dto.email !== undefined) user.email = dto.email;
        if (dto.bio !== undefined) user.bio = dto.bio;

        if (dto.password && dto.password.length >= 8) {
            user.password = bcryptjs.hashSync(dto.password);
        }

        if (file) {
            const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: 'Personal-Blog', resource_type: 'auto' },
                    (error, result) => {
                        if (error || !result) return reject(error);
                        resolve(result);
                    },
                ).end(file.buffer);
            });
            user.avatar = uploaded.secure_url;
        }

        await user.save();

        const newUser = user.toObject({ getters: true }) as unknown as Record<string, unknown>;
        delete newUser.password;
        return newUser as Omit<UserDocument, 'password'>;
    }
}

import { Module } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeController } from './blog-like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogLike, BlogLikeSchema } from './schemas/blog-like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlogLike.name, schema: BlogLikeSchema }]),
  ],
  providers: [BlogLikeService],
  controllers: [BlogLikeController]
})
export class BlogLikeModule {}

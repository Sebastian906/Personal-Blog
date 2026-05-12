import { Module } from '@nestjs/common';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeController } from './blog-like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogLike, BlogLikeSchema } from './schemas/blog-like.schema';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BlogLike.name, schema: BlogLikeSchema }]),
    CommonModule,
  ],
  providers: [BlogLikeService],
  controllers: [BlogLikeController]
})
export class BlogLikeModule {}

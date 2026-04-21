import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: 'Personal-Blog',
        connectionFactory: (connection) => {
          if (connection.readyState === 1) {
            console.log('Database connected successfully', 'MongooseModule');
          }
          connection.on('connected', () => {
            console.log('Database connected', 'MongooseModule');
          });
          connection.on('error', (err) => {
            console.error(`Database connection failed: ${err}`, 'MongooseModule');
          });
          return connection;
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

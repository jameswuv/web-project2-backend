import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Use the new data-source options
    // TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      // Optional: Specify a custom path for your .env file
      // envFilePath: '.development.env',
      // Optional: Specify multiple paths, the first one found takes precedence
      // envFilePath: ['.env.development.local', '.env.development'],
      // Optional: Make ConfigModule global so ConfigService can be injected anywhere
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

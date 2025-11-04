import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './data-source';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Use the new data-source options
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

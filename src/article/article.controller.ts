import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { UserService } from 'src/user/user.service';
import { CreateArticleDto } from './dto/create.article.dto';
import { UpdateArticleDto } from './dto/update.article.dto';

@Controller('article')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  @Get()
  async getArticles(@Request() req) {
    const user = await this.userService.findOne(req.user.username);
    return await this.articleService.getArticlesByCourse(user.course);
  }

  @Post()
  async createArticle(
    @Request() req,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    const user = await this.userService.findOne(req.user.username);
    createArticleDto.authorId = user.id;
    createArticleDto.course = user.course;
    return await this.articleService.createArticle(createArticleDto);
  }

  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Request() req,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const user = await this.userService.findOne(req.user.username);
    if (updateArticleDto.authorId !== user.id) {
      throw new Error('You are not the author of this article');
    }
    updateArticleDto.course = user.course;
    return await this.articleService.updateArticle(id, updateArticleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string, @Request() req) {
    const user = await this.userService.findOne(req.user.username);
    const article = await this.articleService.findOne(id);

    if (article.user.id !== user.id) {
      throw new Error('You are not the author of this article');
    }
    await this.articleService.deleteArticle(id);
    // Placeholder for delete logic
    return { message: `Article with id ${id} deleted` };
  }
}

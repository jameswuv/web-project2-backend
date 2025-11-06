import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create.article.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
  ) {}

  async getArticles() {
    // Placeholder for fetching articles logic
    return this.articlesRepository.find();
  }

  async getArticlesByCourse(course: string) {
    // Placeholder for fetching articles logic
    if (course === '*') {
      const articles = await this.articlesRepository.find({
        relations: ['user'],
        select: {
          id: true,
          title: true,
          content: true,
          course: true,
          createdAt: true,
          updatedAt: true,
          user: {
            username: true,
            name: true,
            email: true,
          },
        },
      });
      // const articles = await this.articlesRepository
      //   .createQueryBuilder('article')
      //   .leftJoinAndSelect('article.user', 'user')
      //   .getMany();
      // return articles;
      return articles;
    } else {
      return this.articlesRepository.find({
        where: { course: course },
        relations: ['user'],
        select: {
          id: true,
          title: true,
          content: true,
          course: true,
          createdAt: true,
          updatedAt: true,
          user: {
            username: true,
            name: true,
            email: true,
          },
        },
      });
    }
  }

  async findOne(id: string) {
    return this.articlesRepository.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });
  }

  async createArticle(createArticleDto: CreateArticleDto, user: User) {
    const article = this.articlesRepository.create(createArticleDto);
    article.user = user;
    article.course = user.course;
    return this.articlesRepository.save(article);
  }

  async updateArticle(id: string, updateArticleDto: any) {
    await this.articlesRepository.update(id, updateArticleDto);
    return this.articlesRepository.findOneBy({ id: Number(id) });
  }

  async deleteArticle(id: string) {
    await this.articlesRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

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
      return this.articlesRepository.find({
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

  async createArticle(createArticleDto: any) {
    const article = this.articlesRepository.create(createArticleDto);
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

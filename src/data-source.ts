// import { DataSource, DataSourceOptions } from 'typeorm';

// export const dataSourceOptions: DataSourceOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'password',
//   database: 'wuv-web',
//   synchronize: true, // Be cautious with this in production
//   entities: ['dist/**/*.entity.js'],
//   migrations: [`${__dirname}/db/migrations/**/*.{j,t}s`],
// };

// const dataSource = new DataSource(dataSourceOptions);

// export default dataSource;

import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_NAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      ssl: true,
      entities: ['dist/**/*.entity.js'],
      migrations: [`${__dirname}/db/migrations/**/*.{j,t}s`],
      synchronize: true,
    };
  }
}

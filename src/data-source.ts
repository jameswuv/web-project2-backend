import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'wuv-web',
  synchronize: true, // Be cautious with this in production
  entities: ['dist/**/*.entity.js'],
  migrations: [`${__dirname}/db/migrations/**/*.{j,t}s`],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

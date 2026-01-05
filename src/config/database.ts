import 'dotenv/config';
import { DataSource } from 'typeorm';
import { List } from '../lists/list.entity';
import { Item } from '../items/item.entity';

const migrationsPath =
  process.env.NODE_ENV === 'production'
    ? 'dist/migrations/*.js'
    : 'src/migrations/*.ts';

const entitiesPath =
  process.env.NODE_ENV === 'production'
    ? ['dist/**/*.entity.js']
    : [List, Item];

export default new DataSource({
  type: 'postgres',
  host:
    process.env.DB_HOST ||
    'shopping-list-dev.cbascew648wh.us-west-2.rds.amazonaws.com',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
  entities: entitiesPath,
  migrations: [migrationsPath],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: false,
  },
});

import { InferModel } from 'drizzle-orm';
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const marketsTable = mysqlTable('markets', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export type MarketModelInsert = InferModel<typeof marketsTable, 'insert'>;
export type MarketModel = InferModel<typeof marketsTable, 'select'>;

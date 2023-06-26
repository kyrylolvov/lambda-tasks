import { InferModel } from 'drizzle-orm';
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const cryptoCurrenciesTable = mysqlTable('crypto_currencies', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export type CryptoCurrencyModelInsert = InferModel<typeof cryptoCurrenciesTable, 'insert'>;
export type CryptoCurrencyModel = InferModel<typeof cryptoCurrenciesTable, 'select'>;

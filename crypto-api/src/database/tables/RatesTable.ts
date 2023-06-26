import { InferModel } from 'drizzle-orm';
import { float, int, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';

import { marketsTable } from './MarketsTable.js';
import { cryptoCurrenciesTable } from './CryptoCurreniesTable.js';

export const ratesTable = mysqlTable('rates', {
  id: int('id').autoincrement().primaryKey(),
  price: float('price').notNull(),
  date: timestamp('date').defaultNow(),
  market: int('market')
    .references(() => marketsTable.id)
    .notNull(),
  cryptocurrency: int('cryptocurrency')
    .references(() => cryptoCurrenciesTable.id)
    .notNull(),
});

export type RatesModelInsert = InferModel<typeof ratesTable, 'insert'>;
export type RatesModel = InferModel<typeof ratesTable, 'select'>;

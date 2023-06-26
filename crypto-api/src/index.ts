import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

import { ApiCoinMarketCap } from './services/api/ApiCoinMarketCap.js';
import { ApiCoinBase } from './services/api/ApiCoinBase.js';
import { ApiCoinStats } from './services/api/ApiCoinStats.js';
import { ApiKucoin } from './services/api/ApiKucoin.js';

dotenv.config();

const { SERVER_PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

const connection = await mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

const db = drizzle(connection);

console.log('Connection to database established!');

const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));

const apiCoinMarketCap = new ApiCoinMarketCap();
const apiCoinBase = new ApiCoinBase();
const apiCoinStats = new ApiCoinStats();
const apiKucoin = new ApiKucoin();

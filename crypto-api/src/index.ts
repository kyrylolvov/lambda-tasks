import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

import { ApiCoinMarketCap } from './services/api/ApiCoinMarketCap.js';
import { ApiCoinBase } from './services/api/ApiCoinBase.js';
import { ApiCoinStats } from './services/api/ApiCoinStats.js';
import { ApiKucoin } from './services/api/ApiKucoin.js';

dotenv.config();

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));

const apiCoinMarketCap = new ApiCoinMarketCap();
const apiCoinBase = new ApiCoinBase();
const apiCoinStats = new ApiCoinStats();
const apiKucoin = new ApiKucoin();

// const connection = await mysql.createConnection({
//   host: 'host',
//   user: 'user',
//   database: 'database',
// });

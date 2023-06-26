import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

import App from './app.js';

dotenv.config();

const { SERVER_PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

const main = async () => {
  try {
    const client = await mysql.createConnection({ host: MYSQL_HOST, user: MYSQL_USER, password: MYSQL_PASSWORD, database: MYSQL_DATABASE });

    const db = drizzle(client);

    const port = Number(SERVER_PORT);

    const expressApp = new App(port);
    expressApp.use();
    expressApp.listen();
  } catch (e: any) {
    console.log(e);
  }
};

main();

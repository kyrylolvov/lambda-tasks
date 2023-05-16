import { MongoClient } from 'mongodb';
import express from 'express';
import dotenv from 'dotenv';

import router from './router/index.js';

dotenv.config();

const { SERVER_PORT, MONGODB_URL } = process.env;

const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

const mongoClient = new MongoClient(MONGODB_URL!);
await mongoClient.connect();
console.log(`Database connection established`);

app.use('/', router());

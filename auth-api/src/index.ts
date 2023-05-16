import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const { SERVER_PORT, MONGODB_URL } = process.env;

const app = express();

app.use(express.json());

const mongoClient = new MongoClient(MONGODB_URL!);
await mongoClient.connect();
console.log('Connected to database successfully');

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

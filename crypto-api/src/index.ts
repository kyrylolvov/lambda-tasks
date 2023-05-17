import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Server is running on port ${SERVER_PORT}`));

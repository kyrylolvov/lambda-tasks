import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

import { Document } from '../types/json.js';

dotenv.config();

const { MONGODB_URL, MONGO_DB_NAME, MONGO_DB_JSON_COLLECTION } = process.env;

const mongoClient = new MongoClient(MONGODB_URL!);

export const create = async (values: Document) => {
  const documentId = (await mongoClient?.db(MONGO_DB_NAME).collection(MONGO_DB_JSON_COLLECTION!).insertOne(values)).insertedId;

  return documentId;
};

export const getByRoute = async (jsonRoute: string) => {
  const document = await mongoClient?.db(MONGO_DB_NAME).collection(MONGO_DB_JSON_COLLECTION!).findOne({ route: jsonRoute });

  if (!document) return null;

  return {
    id: document._id.toString(),
    route: document.email,
    json: document.json,
  };
};

import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

import { User } from '../types/user.js';
import { Authentication } from '../types/auth.js';

dotenv.config();

const { MONGODB_URL, MONGO_DB_NAME, MONGO_DB_USER_COLLECTION } = process.env;

const mongoClient = new MongoClient(MONGODB_URL!);

export const create = async (values: Authentication) => {
  const userId = (await mongoClient?.db(MONGO_DB_NAME).collection(MONGO_DB_USER_COLLECTION!).insertOne(values)).insertedId;
  const user = await getById(userId);

  return user;
};

export const getById = async (userId: ObjectId) => {
  const user = await mongoClient?.db(MONGO_DB_NAME).collection(MONGO_DB_USER_COLLECTION!).findOne({ _id: userId });

  if (!user) return null;

  return {
    id: user?._id.toString(),
    email: user?.email,
    password: user?.password,
  };
};

export const getByEmail = async (userEmail: string): Promise<User | null> => {
  const user = await mongoClient?.db(MONGO_DB_NAME).collection(MONGO_DB_USER_COLLECTION!).findOne({ email: userEmail });

  if (!user) return null;

  return {
    id: user?._id.toString(),
    email: user?.email,
    password: user?.password,
  };
};

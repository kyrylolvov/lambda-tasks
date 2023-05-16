import { Db as MongoDb, ObjectId } from 'mongodb';

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface SignUp {
  email: string;
  password: string;
}

const usersCollection = 'Users';

export default class Users {
  public constructor(private db: MongoDb) {}

  public create = async (values: SignUp) => {
    const userId = (await this.db.collection(usersCollection).insertOne(values)).insertedId;
    const user = this.getById(userId);

    return user;
  };

  public getById = async (userId: ObjectId) => {
    const user = await this.db.collection(usersCollection).findOne({ _id: userId });

    return user;
  };

  public getByEmail = async (userEmail: string) => {
    const user = await this.db.collection(usersCollection).findOne({ email: userEmail });

    return user;
  };
}

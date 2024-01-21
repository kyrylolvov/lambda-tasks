import { promises as fsPromises } from 'fs';
import User from './user.js';

const { readFile, writeFile } = fsPromises;

export default class Database {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public async addUser(user: User): Promise<void> {
    const data = await readFile(this.filePath, 'utf8');

    await writeFile(this.filePath, data + user.toJSON() + '\n');
  }

  public async getUsers(): Promise<User[]> {
    const data = await readFile(this.filePath, 'utf8');

    return data
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line));
  }
}

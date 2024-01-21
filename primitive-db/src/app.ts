import { confirm, input } from '@inquirer/prompts';
import Database from './database.js';
import User from './user.js';
import { messages } from './constants.js';

export default class App {
  private database: Database;

  constructor() {
    this.database = new Database('./src/users.txt');
  }

  public async run(): Promise<void> {
    await this.addNewUsers();
    await this.viewUsers();
  }

  private async addNewUsers(): Promise<void> {
    let user = await User.createUser();

    while (user) {
      await this.database.addUser(user);
      user = await User.createUser();
    }
  }

  private async viewUsers(): Promise<void> {
    const answer = await confirm({ message: messages.searchConfirm });

    if (!answer) return;

    const users = await this.database.getUsers();

    const searchName = await input({
      message: messages.search,
    });

    const searchedUsers = users.filter((user) => user.name.toLowerCase() === searchName.toLowerCase());

    if (searchedUsers.length === 0) {
      console.log('No users with specified name were found.');
    } else {
      searchedUsers.forEach((user) => console.log(user));
    }
  }
}

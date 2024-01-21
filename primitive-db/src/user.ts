import { input, select } from '@inquirer/prompts';
import { genderOptions, messages } from './constants.js';

export default class User {
  public name: string;
  public gender: string;
  public age: number;

  constructor(name: string, gender: string, age: number) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }

  public static async createUser(): Promise<User | null> {
    const name = await input({
      message: messages.name,
    });

    if (!name) return null;

    const gender = await select({
      message: messages.gender,
      choices: genderOptions,
    });

    const age = await input({
      message: messages.age,
      validate: User.validateAge,
    });

    return new User(name, gender, Number(age));
  }

  public static validateAge(value: string): string | boolean {
    const age = Number(value);
    if (isNaN(age) || age <= 0) return 'Please enter a valid age.';
    return true;
  }

  toJSON(): string {
    return JSON.stringify({
      name: this.name,
      gender: this.gender,
      age: this.age,
    });
  }
}

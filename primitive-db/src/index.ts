import { readFile, existsSync } from 'fs';
import { input, confirm, select } from '@inquirer/prompts';

import { messages, genderOptions, ageValidation, IUser } from './utils.js';
import { appendFile } from 'fs';

const addUser = async () => {
  let continueAdding = true;

  while (continueAdding) {
    const name = await input({
      message: messages.name,
    });

    if (!name) {
      continueAdding = false;
      break;
    }

    const gender = await select({
      message: messages.gender,
      choices: genderOptions,
    });

    const age = await input({
      message: messages.age,
      validate: (value: string) => ageValidation(value),
    });

    const user = { name, gender, age: +age };

    appendFile('./src/users.txt', JSON.stringify(user) + '\n', (error) => {
      if (error) console.log(error);
    });
  }

  return;
};

const viewUsers = async () => {
  const answer = await confirm({ message: 'Would you like to search values in database?' });

  if (!answer) process.exit();

  if (!existsSync('./src/users.txt')) {
    console.log("The users.json file doesn't exist.");
    return;
  }

  readFile('./src/users.txt', 'utf8', async (error, data) => {
    if (!data || error) console.log(error);

    const savedUsers = data
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line));

    let searchedUsers: IUser[] = [];

    await input({
      message: messages.search,
      validate: (value: string) => {
        searchedUsers = savedUsers.filter((user) => user.name.toLowerCase() === value.toLowerCase());

        if (!searchedUsers.length) return 'No users with specified name were found.';

        return true;
      },
    });

    if (searchedUsers.length === 1) {
      console.log(`User ${searchedUsers[0].name} was found:`);
      console.log(searchedUsers[0]);
    } else {
      console.log(`Several user with name ${searchedUsers[0].name} were found:`);
      console.log(searchedUsers);
    }

    return;
  });
};

const main = async () => {
  await addUser();
  viewUsers();
};

main();

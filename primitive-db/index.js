import { writeFile, readFile } from 'fs';
import { input, select, confirm } from '@inquirer/prompts';
import { messages, genderOptions, ageValidation } from './utils.js';

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
      validate: (value) => ageValidation(value),
    });

    const user = { name, gender, age: +age };

    readFile('./users.json', 'utf8', (error, data) => {
      let users;

      if (!data || error) users = [];
      else users = JSON.parse(data);

      users.push(user);

      writeFile('./users.json', JSON.stringify(users), (error) => {
        if (error) console.log(error);
      });
    });
  }

  return;
};

const viewUsers = async () => {
  const answer = await confirm({ message: 'Would you like to search values in database?' });

  if (!answer) process.exit();

  readFile('./users.json', 'utf8', async (error, data) => {
    if (!data || error) console.log(error);

    const savedUsers = JSON.parse(data);

    let searchedUsers = [];

    await input({
      message: messages.search,
      validate: (value) => {
        searchedUsers = savedUsers.filter((user) => user.name.toLowerCase() === value.toLowerCase());

        if (!searchedUsers.length) return "User doesn't exist";

        return true;
      },
    });

    if (searchedUsers.length === 1) {
      console.log(`User ${searchedUsers[0].name} was found`);
      console.log(searchedUsers[0]);
    } else {
      console.log(`Several user with name ${searchedUsers[0].name} were found`);
      console.log(searchedUsers);
    }

    return;
  });
};

await addUser();
viewUsers();

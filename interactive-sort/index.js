// apple 47 apple dog 0 elephant 20 car -5 10
import { messages } from './utils.js';

let inputList = [];

const promptInput = () => {
  process.stdout.write(messages.welcome);
};

const promptMenu = () => {
  process.stdout.write(messages.menu);
};

const processInput = (data) => {
  const input = data.toString().trim();

  if (input === 'exit') process.exit();

  if (input.split(' ').length !== 10) {
    promptInput();
    return;
  }

  inputList = input.split(' ');
  promptMenu();
};

const processMenu = (data) => {
  let startAgain = true;

  const input = data.toString().trim();

  if (input === 'exit') process.exit();

  if (!/^[0-9]$/.test(input)) {
    promptMenu();
    return;
  }

  switch (input) {
    case '1': {
      console.log(inputList.filter((value) => isNaN(Number(value))).sort());
      break;
    }
    case '2': {
      console.log(inputList.filter((value) => isNaN(Number(value))).sort((a, b) => a.length - b.length));
      break;
    }
    case '3': {
      console.log(Array.from(new Set(inputList.filter((value) => isNaN(Number(value))))));
      break;
    }
    case '4': {
      console.log(
        inputList
          .filter((value) => !isNaN(Number(value)))
          .map(Number)
          .sort((a, b) => a - b),
      );
      break;
    }
    case '5': {
      console.log(
        inputList
          .filter((value) => !isNaN(Number(value)))
          .map(Number)
          .sort((a, b) => b - a),
      );
      break;
    }
    case '6': {
      console.log(Array.from(new Set(inputList)));
      break;
    }

    default: {
      processMenu();
      startAgain = false;
      break;
    }
  }

  if (startAgain) {
    inputList = [];
    promptInput();
  }
};

promptInput();

process.stdin.on('data', (data) => {
  if (inputList.length) processMenu(data);
  else processInput(data);
});

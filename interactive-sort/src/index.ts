import { messages } from './utils.js';

let inputList: string[] = [];

const promptInput = () => {
  process.stdout.write(messages.welcome);
};

const promptMenu = () => {
  process.stdout.write(messages.menu);
};

const processInput = (data: Buffer) => {
  const input = data.toString().trim();

  if (input === 'exit') process.exit();

  if (input.split(' ').length !== 10) {
    promptInput();
    return;
  }

  inputList = input.split(' ');
  promptMenu();
};

const processMenu = (data: Buffer) => {
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
      console.log(inputList.filter((value) => isNaN(Number(value))).sort((a: string, b: string) => a.length - b.length));
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
      processMenu(data);
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

// apple 47 apple dog 0 elephant 20 car -5 10
// banana 35 grape cat -6 pineapple 22 truck -1 18
// orange 54 guitar fox 19 kiwi -8 7 train 40
// lemon 28 piano horse 11 apricot 16 boat -2 9
// cherry 42 saxophone tiger 3 peach 25 bike 5 13

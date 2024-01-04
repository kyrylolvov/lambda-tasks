import Menu from './menu.js';

class App {
  inputList: string[];

  constructor() {
    this.inputList = [];
    process.stdin.on('data', (data) => this.processInput(data));
  }

  processInput(data: Buffer) {
    const input = data.toString().trim();

    if (input === 'exit') process.exit();

    if (this.inputList.length === 0) {
      if (input.split(' ').length !== 10) {
        Menu.displayWelcomeMessage();
        return;
      }

      this.inputList = input.split(' ');
      Menu.displayMainMenu();
    } else {
      const output = Menu.processMenu(input, this.inputList);
      if (output !== null) {
        console.log(output);
        this.inputList = [];
        Menu.displayWelcomeMessage();
      } else {
        Menu.displayMainMenu();
      }
    }
  }

  run() {
    Menu.displayWelcomeMessage();
  }
}

export default App;

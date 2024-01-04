import Sorter from './sorter.js';

class Menu {
  static displayWelcomeMessage() {
    console.log('\nPlease enter ten words or digits divided by space: ');
  }

  static displayMainMenu() {
    console.log(`
How would you like to sort values?
1. Words by name (A - Z)
2. Words by quantity of letters
3. Words by uniquity
4. Digits from least to greatest
5. Digits from greatest to least
6. Only unique values (words/digits)
          
Select (1 - 6) and press Enter: `);
  }

  static processMenu(input: string, inputList: string[]) {
    switch (input) {
      case '1':
        return Sorter.sortWordsByName(inputList);
      case '2':
        return Sorter.sortWordsByLength(inputList);
      case '3':
        return Sorter.uniqueWords(inputList);
      case '4':
        return Sorter.sortNumbersAscending(inputList);
      case '5':
        return Sorter.sortNumbersDescending(inputList);
      case '6':
        return Sorter.uniqueValues(inputList);
      default:
        return null;
    }
  }
}

export default Menu;

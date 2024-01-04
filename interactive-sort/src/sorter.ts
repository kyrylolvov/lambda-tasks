class Sorter {
  static sortWordsByName(words: string[]) {
    return words.filter((value) => isNaN(Number(value))).sort();
  }

  static sortWordsByLength(words: string[]) {
    return words.filter((value) => isNaN(Number(value))).sort((a, b) => a.length - b.length);
  }

  static uniqueWords(words: string[]) {
    return Array.from(new Set(words.filter((value) => isNaN(Number(value)))));
  }

  static sortNumbersAscending(numbers: string[]) {
    return numbers
      .filter((value) => !isNaN(Number(value)))
      .map(Number)
      .sort((a, b) => a - b);
  }

  static sortNumbersDescending(numbers: string[]) {
    return numbers
      .filter((value) => !isNaN(Number(value)))
      .map(Number)
      .sort((a, b) => b - a);
  }

  static uniqueValues(values: string[]) {
    return Array.from(new Set(values));
  }
}

export default Sorter;

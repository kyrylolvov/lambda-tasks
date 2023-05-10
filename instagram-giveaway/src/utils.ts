export const uniqueValues = async (filesContent: string[]): Promise<void> => {
  const uniqueValues = new Set<string>();

  for (const fileContent of filesContent) {
    const lines = fileContent.split('\n');
    for (const line of lines) {
      uniqueValues.add(line);
    }
  }

  console.log(`Number of unique values: ${Array.from(uniqueValues).length}`);
};

export const existInNumberOfFiles = async (filesContent: string[], numberOfFiles: number): Promise<void> => {
  // const valueCounts = new Map<string, number>();
  const valueCounts: { [key: string]: number } = {};

  filesContent.forEach((values) => {
    const uniqueValues = new Set<string>(values.split('\n'));
    uniqueValues.forEach((value) => {
      // valueCounts.set(value, (valueCounts.get(value) || 0) + 1);
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    });
  });

  let numberOfValuesInFiles = 0;

  for (const value in valueCounts) {
    if (valueCounts[value] >= numberOfFiles) {
      numberOfValuesInFiles++;
    }
  }

  // valueCounts.forEach((count) => {
  //   if (count >= numberOfFiles) {
  //     numberOfValuesInFiles++;
  //   }
  // });

  console.log(`Number of values present in ${numberOfFiles === 10 ? 'at least' : ''} ${numberOfFiles} files: ${numberOfValuesInFiles}`);
};

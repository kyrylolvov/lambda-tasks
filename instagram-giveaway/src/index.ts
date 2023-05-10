import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs/promises';

import { existInNumberOfFiles, uniqueValues } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../');

// 200kwords
// 2milwords

const filePaths: string[] = Array.from({ length: 20 }, (_, index) => {
  return join(projectRoot + `/src/2milwords/out${index}.txt`);
});

const filesContent = await Promise.all(filePaths.map((filePath) => fs.readFile(filePath, 'utf-8')));

const measureTime = async (func: () => Promise<void>): Promise<void> => {
  const start = process.hrtime.bigint();

  await func();

  const end = process.hrtime.bigint();
  const timeTakenInNanoseconds = end - start;
  const timeTakenInSeconds = Number(timeTakenInNanoseconds) / 1_000_000_000;

  console.log(`Time taken: ${timeTakenInSeconds} seconds`);
};

measureTime(async () => {
  await uniqueValues(filesContent);
  await existInNumberOfFiles(filesContent, filePaths.length);
  await existInNumberOfFiles(filesContent, 10);
});

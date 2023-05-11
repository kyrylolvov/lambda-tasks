import dotenv from 'dotenv';

import { IObject, getData } from './utils.js';

dotenv.config();

const { JSONBASE_API_URL } = process.env;

const endpointIds = [793, 955, 231, 931, 93, 342, 770, 491, 281, 718, 310, 806, 469, 258, 516, 79, 706, 521, 350, 64];

let positiveValues = 0;
let negativeValues = 0;

const findIsValid = (object: IObject) => {
  if (object.hasOwnProperty('isDone')) return object.isDone;

  const objectValues = Object.values(object);

  objectValues.map((value) => {
    if (typeof value === 'object' && value !== null) findIsValid(value);
  });
};

const main = async () => {
  for (const endpointId of endpointIds) {
    const json = await getData(endpointId);

    if (json) {
      const isDone = findIsValid(json);

      isDone ? (positiveValues += 1) : (negativeValues += 1);

      console.log(`${JSONBASE_API_URL}/${endpointId}: isDone - ${isDone}`);
    }
  }

  console.log(`\nTrue values: ${positiveValues}`);
  console.log(`False values: ${negativeValues}`);
};

await main();

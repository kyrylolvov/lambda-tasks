import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

import fs from 'fs/promises';
import { ISortedVacation, IUnsortedVacation } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../');

const filesContent: IUnsortedVacation[] = JSON.parse(await fs.readFile(projectRoot + '/src/vacations.json', 'utf-8'));

const sortVacations = () => {
  let vacations: ISortedVacation[] = [];

  filesContent.map((unsortedVacation: IUnsortedVacation) => {
    const weekend = { startDate: unsortedVacation.startDate, endDate: unsortedVacation.endDate };

    if (vacations.find((vacation) => vacation.userId === unsortedVacation.user._id)) {
      const vacationIndex = vacations.findIndex((vacation) => vacation.userId === unsortedVacation.user._id);
      vacations[vacationIndex].weekendDates = [...(vacations[vacationIndex].weekendDates ?? []), weekend];
      return;
    }

    vacations.push({ userId: unsortedVacation.user._id, name: unsortedVacation.user.name, weekendDates: [weekend] });
  });

  return vacations;
};

const sortedVacations = sortVacations();

console.log(sortedVacations);

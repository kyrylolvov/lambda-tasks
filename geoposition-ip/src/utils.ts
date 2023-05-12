import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs/promises';

export interface IpRange {
  start: number;
  end: number;
  countryCode: string;
  countryName: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../');

const fileContent = await fs.readFile(projectRoot + '/src/ip-location.csv', 'utf-8');

const intToIpAddress = (integer: number) => {
  const octet1 = (integer >> 24) & 255;
  const octet2 = (integer >> 16) & 255;
  const octet3 = (integer >> 8) & 255;
  const octet4 = integer & 255;

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
};

const ipAddressToInt = (address: string) => {
  const octets = address.split('.');

  const binaryIpAddress = octets.map((octet: string) => Number(octet).toString(2).padStart(8, '0')).join('');

  return parseInt(binaryIpAddress, 2);
};

export const identifyIpAddress = (ipAddress: string) => {
  const lines = fileContent.replace(/["\r]/g, '').split('\n');

  const searchedIpAddress = ipAddressToInt(ipAddress);

  for (const line of lines) {
    if (line.split(',')[3] !== '-' && line !== '') {
      const startRange = Number(line.split(',')[0]);
      const endRange = Number(line.split(',')[1]);
      const countryName = line.split(',')[3];

      if (searchedIpAddress >= startRange && searchedIpAddress <= endRange) {
        return `${intToIpAddress(startRange)} - ${intToIpAddress(endRange)} => ${countryName}`;
      }
    }
  }

  return "IP Address couldn't be identified";
};

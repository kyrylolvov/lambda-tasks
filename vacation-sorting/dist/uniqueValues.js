import fs from 'fs/promises';
export const uniqueValues = async (filePaths) => {
    const filesContent = await Promise.all(filePaths.map((filePath) => fs.readFile(filePath, 'utf-8')));
    const uniqueValues = new Set();
    for (const fileContent of filesContent) {
        const lines = fileContent.split('\n');
        for (const line of lines) {
            uniqueValues.add(line);
        }
    }
    return uniqueValues;
};

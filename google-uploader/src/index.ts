import { promptFileName, promptFilePath, promptShortenUrl } from './views/prompt.js';
import { getFileUrl, uploadFileToDrive } from './models/googleDrive.js';
import { minimizeUrl } from './models/tinyUrl.js';

const { filePath, fileName, fileExtension } = await promptFilePath();

console.log(`
Path to file: ${filePath}
File name: ${fileName}
File extension: ${fileExtension}
`);

const finalFileName = await promptFileName(fileName);

const uploadedFile = await uploadFileToDrive(finalFileName, fileExtension, filePath);
console.log('File uploaded successfully!');

const fileUrl = await getFileUrl(uploadedFile.id!);
console.log(`Your link to preview file: ${fileUrl}`);

const shortenUrl = await promptShortenUrl();

if (shortenUrl) {
  const tinyUrl = await minimizeUrl(fileUrl!);
  console.log(`Your short link is: ${tinyUrl}`);
}

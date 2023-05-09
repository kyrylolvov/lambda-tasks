import { input, confirm } from '@inquirer/prompts';
import path from 'path';

const imageValidation = (filePath: string) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];

  const fileExtension = path.extname(filePath.trim()).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) return 'Please select a valid image file';

  return true;
};

const promptFilePath = async () => {
  let fileName = '';
  let fileExtension = '';

  let filePath = await input({
    message: messages.welcome,
    validate: (value: string) => imageValidation(value.trim().replace(/^\'|\'$/g, '')),
  });

  filePath = filePath.trim().replace(/^\'|\'$/g, '');
  fileExtension = path.extname(filePath);
  fileName = path.basename(filePath, fileExtension);

  return { filePath, fileName, fileExtension };
};

const promptFileName = async (fileName: string) => {
  const fileNameChange = await confirm({ message: `You're uploading file with name ${fileName}\nWould you like to change it?` });

  if (fileNameChange) {
    fileName = await input({
      message: messages.fileName,
    });
  }

  return fileName;
};

const promptShortenUrl = async () => {
  const shortenUrl = await confirm({ message: messages.shortenUrl });

  return { shortenUrl };
};

const messages = {
  welcome: 'Drag and drop your image to terminal:',
  fileName: 'Enter new file name (without extension):',
  shortenUrl: 'Do you want to short your link?:',
};

export { promptFilePath, promptFileName, promptShortenUrl };

import { drive_v3, google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN } = process.env;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oAuth2Client });

const uploadFileToDrive = async (fileName: string, fileExtension: string, filePath: string) => {
  try {
    const { data } = await drive.files.create({
      requestBody: {
        name: fileName + fileExtension.toLowerCase(),
        mimeType: `image/${fileExtension.toLowerCase().replace('.', '')}`,
        parents: ['1Uql83bY72s2-lQcxHG3_V8z5CgmMM7Mm'],
      },
      media: {
        mimeType: `image/${fileExtension.toLowerCase().replace('.', '')}`,
        body: fs.createReadStream(filePath.replace(/['"]+/g, '')),
      },
    });

    return data;
  } catch (err) {
    throw err;
  }
};

const getFileUrl = async (id: string) => {
  try {
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const { data } = await drive.files.get({
      fileId: id,
      fields: 'webViewLink, webContentLink',
    });

    return data.webViewLink;
  } catch (err) {
    throw err;
  }
};

export { uploadFileToDrive, getFileUrl };

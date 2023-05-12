import express from 'express';

import { identifyIpAddress } from './utils.js';

const app = express();

app.use(express.json());

app.get('/ip-address', async (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const response = identifyIpAddress(ipAddress as string);

  if (response === "IP Address couldn't be identified") return res.status(400).json({ message: response });

  return res.status(200).json({ message: response });
});

app.post('/check', async (req, res) => {
  const { ipAddress } = req.body;

  if (!ipAddress) return res.status(400).json({ message: 'Please provide an IP address' });

  const response = identifyIpAddress(ipAddress);

  if (response === "IP Address couldn't be identified") return res.status(400).json({ message: response });

  return res.status(200).json({ message: response });
});

app.listen(3000, () => console.log(`Server is listening on port 3000`));

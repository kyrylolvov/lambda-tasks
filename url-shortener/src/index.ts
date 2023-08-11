import express from 'express';
import dotenv from 'dotenv';
import App from './App';

dotenv.config();

const { SERVER_PORT } = process.env;

async function main() {
  const portNumber = Number(SERVER_PORT);

  try {
    const expressApp = new App(portNumber);

    expressApp.use();
    expressApp.listen();
  } catch (err) {
    console.log(err);
  }
}

main();

import express, { Application } from 'express';

import Controller from './controllers/controller.js';

class App {
  public app: Application;
  private readonly port: number;
  private readonly controllers: Controller[];

  public constructor(port: number, controllers: Controller[]) {
    this.app = express();
    this.port = port;
    this.controllers = controllers;
  }

  public listen = () => {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  };

  public use = () => {
    return this.app;
  };
}

export default App;

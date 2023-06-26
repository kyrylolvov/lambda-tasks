import express, { Application } from 'express';

class App {
  public app: Application;
  private readonly port: number;

  public constructor(port: number) {
    this.app = express();
    this.port = port;
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

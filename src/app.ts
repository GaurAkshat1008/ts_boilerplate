import express from "express";
import logger from "./utils/logger";
class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  private routes() {}
  public run() {
    this.routes();
    this.app.listen(3000, () => {
      logger.info("Server is running on port 3000");
    });
  }
}

export default App;

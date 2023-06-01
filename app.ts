import { config } from "dotenv";
config();

import express from "express";
import { Application } from "express";
import bodyParser from "body-parser";

import cors from "cors";

import v1Routes from "./routes/v1";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();

    // this.mongoSetup();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());

    this.app.use("/v1", v1Routes);
  }
}

export default new App().app;

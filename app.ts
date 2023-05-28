import { config } from 'dotenv'
config()

import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';

import * as cors from 'cors'

import { Routes } from './routes';


class App {
    public app: express.Application;
    public route: Routes = new Routes();
    public mongoUrl: string = process.env.MONGO_URL;

    constructor() {
        this.app = express();
        this.config();
        this.route.routes(this.app);
       // this.mongoSetup();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());

        
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false}));
        this.app.use(cors());

        // this.app.use(
        //     cors({
        //       origin: '*',
        //       optionsSuccessStatus: 200,
        //     })
        //   )


          //Enable CORS from client side
        //     this.app.use(function (req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header('Access-Control-Allow-Methods', 'PUT,GET,DELETE,POST,OPTIONS');
        //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept, Authorization' +' Access-Control-Allow-Credential');
        //         res.header('Access-Control-Allow-Credentials', 'true');

        //     next();
        // });

    }

    private mongoSetup(): void {
        // mongoose.Promise = global.Promise;
        // mongoose.connect(this.mongoUrl, { useNewUrlParser: true });

        mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(res => { console.log(`${this.mongoUrl}`) })
        .catch(err => { console.log('mongo error in connection:', err) });

    }
}

export default new App().app;
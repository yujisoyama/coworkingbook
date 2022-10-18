import express from 'express';
import { AppDataSource } from "./data-source";
import routes from './routes';
import cors from 'cors';
import "dotenv/config";

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(routes)
    return app.listen(process.env.PORT);
}).catch(error => console.log(error))

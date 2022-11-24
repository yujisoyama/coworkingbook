import express from 'express';
import { AppDataSource } from "./data-source";
import routes from './routes';
import cors from 'cors';
import "dotenv/config";
import { periodRepository } from './repositories/PeriodRepository';
import { defaultPeriod } from './utils/defautPeriod';

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(routes);

    if (await periodRepository.count() === 0) {
        defaultPeriod.map(async period => {
            const newPeriod = periodRepository.create(period);
            await periodRepository.save(newPeriod);
        });
    }

    return app.listen(process.env.PORT);
}).catch(error => console.log(error))

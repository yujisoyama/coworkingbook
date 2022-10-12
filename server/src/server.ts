import express from 'express';
import { AppDataSource } from "./data-source";
import { User } from "./entity/Users";

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.json());

    app.get('/', (req, res) => {
        return res.json('Ok!')
    })

    return app.listen(process.env.PORT);

}).catch(error => console.log(error))

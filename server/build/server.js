"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const PeriodRepository_1 = require("./repositories/PeriodRepository");
const defautPeriod_1 = require("./utils/defautPeriod");
data_source_1.AppDataSource.initialize().then(async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(routes_1.default);
    if (await PeriodRepository_1.periodRepository.count() === 0) {
        defautPeriod_1.defaultPeriod.map(async (period) => {
            const newPeriod = PeriodRepository_1.periodRepository.create(period);
            await PeriodRepository_1.periodRepository.save(newPeriod);
        });
    }
    return app.listen(process.env.PORT);
}).catch(error => console.log(error));

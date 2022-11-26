"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.periodRepository = void 0;
const data_source_1 = require("../data-source");
const Period_1 = require("../entities/Period");
exports.periodRepository = data_source_1.AppDataSource.getRepository(Period_1.Period);

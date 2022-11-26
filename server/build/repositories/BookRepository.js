"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRepository = void 0;
const data_source_1 = require("../data-source");
const Book_1 = require("../entities/Book");
exports.bookRepository = data_source_1.AppDataSource.getRepository(Book_1.Book);

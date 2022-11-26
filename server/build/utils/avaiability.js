"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotAvailable = exports.getAlreadyBooked = void 0;
const BookRepository_1 = require("../repositories/BookRepository");
const getAlreadyBooked = async (type, booking_day, booking_number, period) => {
    try {
        return await BookRepository_1.bookRepository.createQueryBuilder("book")
            .where("book.type = :type", { type })
            .andWhere("book.booking_day = :booking_day", { booking_day })
            .andWhere("book.booking_number = :booking_number", { booking_number })
            .andWhere("book.period in (:...period)", { period })
            .select(["booking_number", "period_id"])
            .execute();
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAlreadyBooked = getAlreadyBooked;
const getNotAvailable = async (type, booking_day, period) => {
    try {
        return await BookRepository_1.bookRepository.createQueryBuilder("book")
            .where("book.type = :type", { type })
            .andWhere("book.booking_day = :booking_day", { booking_day })
            .andWhere("book.period in (:...period)", { period })
            .select(["booking_number"])
            .execute();
    }
    catch (error) {
        console.log(error);
    }
};
exports.getNotAvailable = getNotAvailable;

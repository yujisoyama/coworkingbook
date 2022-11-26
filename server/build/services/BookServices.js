"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BookRepository_1 = require("../repositories/BookRepository");
const avaiability_1 = require("../utils/avaiability");
class BookServices {
    async save({ type, booking_number, period_id, booking_day, user }) {
        let alreadyBooked;
        switch (Number(period_id)) {
            case 1:
                alreadyBooked = await (0, avaiability_1.getAlreadyBooked)(type, booking_day, booking_number, [1, 3]);
                break;
            case 2:
                alreadyBooked = await (0, avaiability_1.getAlreadyBooked)(type, booking_day, booking_number, [2, 3]);
                break;
            case 3:
                alreadyBooked = await (0, avaiability_1.getAlreadyBooked)(type, booking_day, booking_number, [1, 2, 3]);
                break;
        }
        if (alreadyBooked.length) {
            return undefined;
        }
        else {
            const newBook = BookRepository_1.bookRepository.create({
                type,
                booking_number,
                period: period_id,
                booking_day,
                user
            });
            await BookRepository_1.bookRepository.save(newBook);
            return newBook;
        }
    }
    async getAvailability(booking_day, period) {
        let notAvailableDesks;
        let notAvailableRooms;
        switch (Number(period)) {
            case 1:
                notAvailableDesks = await (0, avaiability_1.getNotAvailable)("desk", booking_day, [1, 3]);
                notAvailableRooms = await (0, avaiability_1.getNotAvailable)("room", booking_day, [1, 3]);
                break;
            case 2:
                notAvailableDesks = await (0, avaiability_1.getNotAvailable)("desk", booking_day, [2, 3]);
                notAvailableRooms = await (0, avaiability_1.getNotAvailable)("room", booking_day, [2, 3]);
                break;
            case 3:
                notAvailableDesks = await (0, avaiability_1.getNotAvailable)("desk", booking_day, [1, 2, 3]);
                notAvailableRooms = await (0, avaiability_1.getNotAvailable)("room", booking_day, [1, 2, 3]);
                break;
        }
        return { notAvailableDesks, notAvailableRooms };
    }
    async getUpcomingBooks(userId, todayDate) {
        const upcomingBooks = await BookRepository_1.bookRepository.createQueryBuilder("book")
            .where("book.booking_day >= :todayDate", { todayDate })
            .andWhere("book.user_id = :userId", { userId })
            .select(["id", "type", "booking_number", "booking_day", "period_id"])
            .execute();
        return upcomingBooks;
    }
    async getLastBooks(userId, todayDate) {
        const lastBooks = await BookRepository_1.bookRepository.createQueryBuilder("book")
            .where("book.booking_day < :todayDate", { todayDate })
            .andWhere("book.user_id = :userId", { userId })
            .select(["id", "type", "booking_number", "booking_day", "period_id"])
            .execute();
        return lastBooks;
    }
    async cancelBooking(bookId) {
        await BookRepository_1.bookRepository.delete({ id: bookId });
    }
}
const bookServices = new BookServices();
exports.default = bookServices;

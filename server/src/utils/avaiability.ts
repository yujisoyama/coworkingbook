import { bookRepository } from "../repositories/BookRepository";

export const getAlreadyBooked = async (type: string, booking_day: Date, booking_number: number, period: number[]) => {
    try {
        return await bookRepository.createQueryBuilder("book")
            .where("book.type = :type", { type })
            .andWhere("book.booking_day = :booking_day", { booking_day })
            .andWhere("book.booking_number = :booking_number", { booking_number })
            .andWhere("book.period in (:...period)", { period })
            .select(["booking_number", "period_id"])
            .execute();
    } catch (error) {
        console.log(error);
    }
}

export const getNotAvailable = async (type: string, booking_day: Date, period: number[]) => {
    try {
        return await bookRepository.createQueryBuilder("book")
            .where("book.type = :type", { type })
            .andWhere("book.booking_day = :booking_day", { booking_day })
            .andWhere("book.period in (:...period)", { period })
            .select(["booking_number"])
            .execute();
    } catch (error) {
        console.log(error);
    }
}
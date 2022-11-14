import { Book } from "../entities/Book";
import { bookRepository } from "../repositories/BookRepository";
import { getAlreadyBooked, getNotAvailable } from "../utils/avaiability";
import IBookServices, { IBookSaveRequest } from "./IBookServices";


class BookServices implements IBookServices {
    async save({ type, booking_number, period_id, booking_day, user }: IBookSaveRequest): Promise<Book | undefined> {
        let alreadyBooked;
        switch (Number(period_id)) {
            case 1:
                alreadyBooked = await getAlreadyBooked(type, booking_day, booking_number, [1, 3])
                break;
            case 2:
                alreadyBooked = await getAlreadyBooked(type, booking_day, booking_number, [2, 3])
                break;
            case 3:
                alreadyBooked = await getAlreadyBooked(type, booking_day, booking_number, [1, 2, 3])
                break;
        }

        if (alreadyBooked.length) {
            return undefined;
        } else {
            const newBook = bookRepository.create({
                type,
                booking_number,
                period: period_id,
                booking_day,
                user
            });
            await bookRepository.save(newBook)
            return newBook;
        }
    }

    async getAvailability(booking_day: Date, period: number) {
        let notAvailableDesks;
        let notAvailableRooms;
        switch (Number(period)) {
            case 1:
                notAvailableDesks = await getNotAvailable("desk", booking_day, [1, 3])
                notAvailableRooms = await getNotAvailable("room", booking_day, [1, 3])
                break;
            case 2:
                notAvailableDesks = await getNotAvailable("desk", booking_day, [2, 3])
                notAvailableRooms = await getNotAvailable("room", booking_day, [2, 3])
                break;
            case 3:
                notAvailableDesks = await getNotAvailable("desk", booking_day, [1, 2, 3])
                notAvailableRooms = await getNotAvailable("room", booking_day, [1, 2, 3])
                break;
        }
        return { notAvailableDesks, notAvailableRooms }
    }

    async getUpcomingBooks(userId: number, todayDate: string): Promise<Partial<Book[]>> {
        const upcomingBooks: Partial<Book[]> = await bookRepository.createQueryBuilder("book")
            .where("book.booking_day >= :todayDate", { todayDate })
            .andWhere("book.user_id = :userId", { userId })
            .select(["id", "type", "booking_number", "booking_day", "period_id"])
            .execute();
        return upcomingBooks;
    }

    async cancelBooking(bookId: number): Promise<any> {
        await bookRepository.delete({ id: bookId });
    }
}

const bookServices = new BookServices();
export default bookServices;
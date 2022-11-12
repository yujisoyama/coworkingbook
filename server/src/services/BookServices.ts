import { Book } from "../entities/Book";
import { bookRepository } from "../repositories/BookRepository";
import { getAlreadyBooked, getNotAvailable } from "../utils/avaiability";
import IBookServices, { IBookSaveRequest } from "./IBookServices";


class BookServices implements IBookServices {
    async save({ type, booking_number, period, booking_day, user }: IBookSaveRequest): Promise<Book | undefined> {
        let alreadyBooked;
        switch (Number(period)) {
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
                period,
                booking_day,
                user
            });
            await bookRepository.save(newBook)
            return newBook;
        }
    }

    async getAvailability(booking_day: string, period: number) {
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
}

const bookServices = new BookServices();
export default bookServices;
import { Book } from "../entity/Book";
import { bookRepository } from "../repositories/BookRepository";
import IBookServices, { BookSaveRequest } from "./IBookServices";


class BookServices implements IBookServices {
    async save({ desk, period, booking_day, user }: BookSaveRequest): Promise<Book | Error> {
        const newBook = bookRepository.create({ desk, period, booking_day, user });

        await bookRepository.save(newBook)
        return newBook;
    }
}

const bookServices = new BookServices();
export default bookServices;
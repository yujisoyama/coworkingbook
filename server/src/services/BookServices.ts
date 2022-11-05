import { Book } from "../entities/Book";
import { bookRepository } from "../repositories/BookRepository";
import IBookServices, { IBookSaveRequest } from "./IBookServices";


class BookServices implements IBookServices {
    async save({ desk, period, booking_day, user }: IBookSaveRequest): Promise<Book> {
        const newBook = bookRepository.create({ 
            desk, 
            period, 
            booking_day, 
            user 
        });
        await bookRepository.save(newBook)
        return newBook;
    }
}

const bookServices = new BookServices();
export default bookServices;
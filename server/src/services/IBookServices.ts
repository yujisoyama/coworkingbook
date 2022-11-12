import { Book } from "../entities/Book";
import { Period } from "../entities/Period";
import { User } from "../entities/User";

export interface IBookSaveRequest {
    type: string;
    book_number: number;
    period: Period;
    booking_day: Date;
    user: User;
}

export default interface IBookServices {
    save({ type, book_number, period, booking_day, user }: IBookSaveRequest): Promise<Book>;
}
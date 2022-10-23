import { Book } from "../entities/Book";
import { Period } from "../entities/Period";
import { User } from "../entities/User";

export interface BookSaveRequest {
    desk: number;
    period: Period;
    booking_day: Date;
    user: User;
}

export default interface IBookServices {
    save({ desk, period, booking_day, user }: BookSaveRequest): Promise<Book | Error>;
}
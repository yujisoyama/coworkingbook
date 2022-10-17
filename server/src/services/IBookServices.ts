import { Book } from "../entity/Book";
import { Period } from "../entity/Period";
import { User } from "../entity/User";

export interface BookSaveRequest {
    desk: number;
    period: Period;
    booking_day: Date;
    user: User;
}

export default interface IBookServices {
    save({ desk, period, booking_day, user }: BookSaveRequest): Promise<Book | Error>;
}
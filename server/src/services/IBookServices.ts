import { Book } from "../entity/Book";
import { User } from "../entity/User";

export interface BookSaveRequest {
    desk: number;
    period: string;
    booking_day: Date;
    user: User;
}

export default interface IBookServices {
    save({ desk, period, booking_day, user }: BookSaveRequest): Promise<Book | Error>;
}
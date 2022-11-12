import { Book } from "../entities/Book";
import { Period } from "../entities/Period";
import { User } from "../entities/User";

export interface IBookSaveRequest {
    type: string;
    booking_number: number;
    period: Period;
    booking_day: string;
    user: User;
}

export default interface IBookServices {
    save({ type, booking_number, period, booking_day, user }: IBookSaveRequest): Promise<Book | undefined>;
    getAvailability(booking_day: string, period: number): any;
}
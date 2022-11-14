import { Book } from "../entities/Book";
import { Period } from "../entities/Period";
import { User } from "../entities/User";

export interface IBookSaveRequest {
    type: string;
    booking_number: number;
    period_id: Period;
    booking_day: Date;
    user: User;
}

export default interface IBookServices {
    save({ type, booking_number, period_id, booking_day, user }: IBookSaveRequest): Promise<Book | undefined>;
    getAvailability(booking_day: Date, period: number): Promise<any>;
    getUpcomingBooks(userId: number, todayDate: string): Promise<Partial<Book[]>>;
    cancelBooking(bookId: number): Promise<any>;
}
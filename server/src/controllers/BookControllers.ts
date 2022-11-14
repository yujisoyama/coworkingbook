import { Request, Response } from "express";
import IBookServices from "../services/IBookServices";


class BookControllers {
    async create(req: Request, res: Response, bookServices: IBookServices) {
        try {
            const { type, booking_number, period_id, booking_day, user } = req.body;
            const result = await bookServices.save({ type, booking_number, period_id, booking_day, user });

            if (result) {
                return res.status(201).json("Your booking has been done!");
            } else {
                return res.status(409).json("This booking is not available anymore.")
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getAvailability(req: Request, res: Response, bookServices: IBookServices) {
        try {
            const { booking_day, period_id } = req.body;
            const result = await bookServices.getAvailability(booking_day, period_id);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

    async getUpcomingBooks(req:Request, res:Response, bookServices: IBookServices) {
        try {
            const userId = Number(req.params.userId);
            const todayDate = req.params.todayDate;
            const result = await bookServices.getUpcomingBooks(userId, todayDate);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    async cancelUpcomingBook(req:Request, res:Response, bookServices: IBookServices) {
        try {
            const bookId = Number(req.params.bookId);
            await bookServices.cancelBooking(bookId);
            res.status(200).json("Booking canceled!")
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

const bookControllers = new BookControllers();
export default bookControllers;
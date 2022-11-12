import { Request, Response } from "express";
import IBookServices from "../services/IBookServices";


class BookControllers {
    async create(req: Request, res: Response, bookServices: IBookServices) {
        try {
            const { type, booking_number, period, booking_day, user } = req.body;
            const result = await bookServices.save({ type, booking_number, period, booking_day, user });

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
            const { booking_day, period } = req.body;
            const result = await bookServices.getAvailability(booking_day, period);
            return res.json(result);
        } catch (error) {
            console.log(error);
        }
    }
}

const bookControllers = new BookControllers();
export default bookControllers;
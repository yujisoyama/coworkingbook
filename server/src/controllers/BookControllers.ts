import { Request, Response } from "express";
import IBookServices from "../services/IBookServices";


class BookControllers {
    async create(req: Request, res: Response, bookServices: IBookServices) {
        try {
            const { desk, period, booking_day, user } = req.body;
            const result = await bookServices.save({ desk, period, booking_day, user });
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

const bookControllers = new BookControllers();
export default bookControllers;
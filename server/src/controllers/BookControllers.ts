import { Request, Response } from "express";
import IBookServices from "../services/IBookServices";


class BookControllers {
    async create(req: Request, res: Response, bookServices: IBookServices) {
        const { desk, period, booking_day, user } = req.body;
        const result = await bookServices.save({ desk, period, booking_day, user });
        if (result instanceof Error) {
            return res.status(400).json(result.message);
        }
        return res.status(201).json(result);
    }
}

const bookControllers = new BookControllers();
export default bookControllers;
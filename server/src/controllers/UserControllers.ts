import { Request, Response } from "express";
import IUserServices from "../services/IUserServices";

class UserControllers {

    async create(req: Request, res: Response, userServices: IUserServices) {
        const { name, email, password } = req.body;
        const result = await userServices.save({ name, email, password });
        if(result instanceof Error) {
            return res.status(400).json(result.message);
        }
        return res.status(201).json(result);
    }
}

const userControllers = new UserControllers();
export default userControllers;

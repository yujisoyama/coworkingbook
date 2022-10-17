import { Request, Response } from "express";
import IUserServices, { UserSaveRequest } from "../services/IUserServices";

class UserControllers {

    async create(req: Request, res: Response, userServices: IUserServices) {
        const { fullname, email, password, company, role }: UserSaveRequest = req.body;
        const result = await userServices.save({ fullname, email, password, company, role });
        if (result instanceof Error) {
            return res.status(400).json(result.message);
        }
        return res.status(201).json(result);
    }
}

const userControllers = new UserControllers();
export default userControllers;

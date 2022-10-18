import { Request, Response } from "express";
import IUserServices, { UserSaveRequest } from "../services/IUserServices";

class UserControllers {

    async create(req: Request, res: Response, userServices: IUserServices) {
        const { fullname, email, password, company, role }: UserSaveRequest = req.body;
        const result = await userServices.save({ fullname, email, password, company, role });
        return res.status(201).json(result);
    }

    async checkEmail(req: Request, res: Response, userServices: IUserServices) {
        const email = req.params.email;
        const result = await userServices.checkEmail(email);
        return res.status(200).json(result);
    }

    async activateAccount(req: Request, res: Response, userServices: IUserServices) {
        const uuid = req.params.id;
        const result = await userServices.activateAccount(uuid);
        return res.status(200).json(result);
    }
}

const userControllers = new UserControllers();
export default userControllers;

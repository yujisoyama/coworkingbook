import { Request, Response } from "express";
import IUserServices from "../services/IUserServices";

import bcrypt from 'bcrypt'
import path from "path";


export class UserControllers {

    async create(req: Request, res: Response, userServices: IUserServices) {
        try {
            const { fullname, email, password, company, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await userServices.save({ fullname, email, hashedPassword, company, role });
            const {password: _, ...user} = result;
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    async checkEmail(req: Request, res: Response, userServices: IUserServices) {
        try {
            const email = req.params.email;
            const result = await userServices.checkEmail(email);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async activateAccount(req: Request, res: Response, userServices: IUserServices) {
        try {
            const uuid = req.params.uuid;
            const result = await userServices.activateAccount(uuid);
            if (result?.confirmed) {
                return res.sendFile(path.join(__dirname, '../utils/html/indexAlreadyConfirmed.html'));
            } else {
                return res.sendFile(path.join(__dirname, '../utils/html/indexConfirmed.html'));
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

const userControllers = new UserControllers();
export default userControllers;

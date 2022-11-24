import { Request, Response } from "express";
import IUserServices from "../services/IUserServices";

import path from "path";

class UserControllers {

    async create(req: Request, res: Response, userServices: IUserServices) {
        try {
            const { fullname, email, password, company, role } = req.body;
            const result = await userServices.save({ fullname, email, password, company, role });
            const { password: _, ...user } = result;
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

    async login(req: Request, res: Response, userServices: IUserServices) {
        try {
            const { email, password } = req.body;
            const result = await userServices.login(email, password);
            const token = result?.token;

            if (!result) {
                res.status(401).json('Email or Password is invalid.');
            } else {
                if (!result?.user.confirmed) {
                    res.status(405).json('This account needs to be activated')
                } else {
                    res.status(200).json(token);
                }
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            return res.json(req.user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async updateProfile(req: Request, res: Response, userServices: IUserServices) {
        try {
            const { id, fullname, company, role, newPassword, password } = req.body;
            const result = await userServices.updateProfile(id, fullname, company, role, newPassword, password);
            res.status(200).json({ message: result })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getPassword(req: Request, res: Response, userServices: IUserServices) {
        try {
            const email = req.params.email;
            const result = await userServices.getPassword(email);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

const userControllers = new UserControllers();
export default userControllers;

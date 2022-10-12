import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
    async create(req:Request, res:Response) {
        const { name, email, password } = req.body;

        try {
            const userRepository = UserRepository.create({name, email, password});
            await UserRepository.save(userRepository);
            return res.status(201).json(userRepository);
        } catch (err) {
            console.log(err)
            return res.status(500).json({Message: 'Internal server error'})
        }
    }
}
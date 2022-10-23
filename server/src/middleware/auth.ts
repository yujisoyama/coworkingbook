import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/UserRepository";

type JwtPayload = {
    id: number;
}

const jwtPass = process.env.JWT_PASS as string;

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json('Not authorized');
        } else {
            const token = authorization.split(' ')[1];
            const { id } = jwt.verify(token, jwtPass) as JwtPayload;
            const user = await userRepository.findOneBy({ id });
            if (!user) {
                return res.status(401).json('Not authorized')
            }
            const { password: _, ...loggedUser } = user;  
            req.user = loggedUser;
            next();
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}
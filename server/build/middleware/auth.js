"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
const jwtPass = process.env.JWT_PASS;
const authMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json('Not authorized');
        }
        else {
            const token = authorization.split(' ')[1];
            const { id } = jsonwebtoken_1.default.verify(token, jwtPass);
            const user = await UserRepository_1.userRepository.findOneBy({ id });
            if (!user) {
                return res.status(401).json('Not authorized');
            }
            const { password: _, ...loggedUser } = user;
            req.user = loggedUser;
            next();
        }
    }
    catch (error) {
        return res.status(401).json(error);
    }
};
exports.authMiddleware = authMiddleware;

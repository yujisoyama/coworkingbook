"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const mail_1 = require("../utils/mail");
const UserRepository_1 = require("../repositories/UserRepository");
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserServices {
    constructor() {
        this.jwtPass = process.env.JWT_PASS;
    }
    async save({ fullname, email, password, company, role }) {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = UserRepository_1.userRepository.create({
            fullname,
            email,
            password: hashedPassword,
            company,
            role
        });
        await UserRepository_1.userRepository.save(newUser);
        (0, mail_1.sendAccountConfirmEmail)(newUser.uuid, newUser.email, newUser.fullname);
        return newUser;
    }
    async checkEmail(email) {
        const user = await UserRepository_1.userRepository.findOneBy({ email });
        if (user) {
            return user;
        }
        else {
            return undefined;
        }
    }
    async activateAccount(uuid) {
        let user = await UserRepository_1.userRepository.createQueryBuilder("user")
            .where("user.uuid = :uuid", { uuid: uuid })
            .getOne();
        if (user?.confirmed) {
            return user;
        }
        else {
            user = await UserRepository_1.userRepository.createQueryBuilder("user")
                .where("user.uuid = :uuid", { uuid: uuid })
                .getOne();
            await UserRepository_1.userRepository.createQueryBuilder()
                .update(User_1.User)
                .set({ confirmed: true })
                .where("uuid = :uuid", { uuid: uuid })
                .execute();
            return user;
        }
    }
    async login(email, password) {
        const user = await UserRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            return null;
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            return null;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, this.jwtPass, { expiresIn: '8h' });
        const { password: _, ...userLogin } = user;
        return {
            user: userLogin,
            token: token
        };
    }
    async updateProfile(id, fullname, company, role, newPassword, password) {
        const user = await UserRepository_1.userRepository.findOneBy({ id });
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (verifyPass) {
            const updatedUser = UserRepository_1.userRepository.create(user);
            if (typeof newPassword !== 'undefined' && newPassword !== "") {
                const newHashedPassword = await bcrypt_1.default.hash(newPassword, 10);
                updatedUser.password = newHashedPassword;
            }
            updatedUser.fullname = fullname;
            updatedUser.company = company;
            updatedUser.role = role;
            await UserRepository_1.userRepository.save(updatedUser);
            return 'Your profile has been updated!';
        }
        return 'Your password is wrong.';
    }
    async getPassword(email) {
        const user = await UserRepository_1.userRepository.findOneBy({ email });
        if (!user) {
            return "User not founded.";
        }
        let newPassword = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        const newPasswordUser = UserRepository_1.userRepository.create(user);
        newPasswordUser.password = hashedPassword;
        await UserRepository_1.userRepository.save(newPasswordUser);
        (0, mail_1.sendPasswordEmail)(user.email, user.fullname, newPassword);
        return "Your new password has been sent by email.";
    }
}
const userServices = new UserServices();
exports.default = userServices;

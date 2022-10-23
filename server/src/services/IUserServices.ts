import { SelectQueryBuilder } from "typeorm";
import { User } from "../entities/User";

export interface UserSaveRequest {
    fullname: string;
    email: string;
    password: string;
    company: string;
    role: string
}

export default interface IUserServices {
    save({ fullname, email, password, company, role }: UserSaveRequest): Promise<User>;
    checkEmail(email: string): Promise<User | undefined>;
    activateAccount(uuid: string): Promise<User | null>;
    login(email: string, password: string): Promise<object | undefined>;
    getProfile(authorization: string): Promise<object | null>;
}
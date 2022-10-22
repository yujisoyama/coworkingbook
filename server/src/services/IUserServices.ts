import { SelectQueryBuilder } from "typeorm";
import { User } from "../entity/User";

export interface UserSaveRequest {
    fullname: string;
    email: string;
    hashedPassword: string;
    company: string;
    role: string
}

export default interface IUserServices {
    save({ fullname, email, hashedPassword, company, role }: UserSaveRequest): Promise<User>;
    checkEmail(email: string): Promise<User | undefined>;
    activateAccount(uuid: string): Promise<User | null>;
}
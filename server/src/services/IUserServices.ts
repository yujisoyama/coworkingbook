import { User } from "../entities/User";
import { Book } from "../entities/Book";

export interface IUserSaveRequest {
    fullname: string;
    email: string;
    password: string;
    company: string;
    role: string
}

export interface IUserLogin {
    user: {
        id: number;
        uuid: string;
        fullname: string;
        email: string;
        company: string;
        role: string;
        confirmed: boolean;
        created_at: Date;
        updated_at: Date;
        books: Book[];
    },
    token: string;
}

export default interface IUserServices {
    save({ fullname, email, password, company, role }: IUserSaveRequest): Promise<User>;
    checkEmail(email: string): Promise<User | undefined>;
    activateAccount(uuid: string): Promise<User | null>;
    login(email: string, password: string): Promise<IUserLogin | null>;
    getProfile(authorization: string): Promise<object | null>;
}
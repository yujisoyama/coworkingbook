import { User } from "../entities/User";
import { Book } from "../entities/Book";

export interface UserSaveRequest {
    fullname: string;
    email: string;
    password: string;
    company: string;
    role: string
}

export interface UserLogin {
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
    save({ fullname, email, password, company, role }: UserSaveRequest): Promise<User>;
    checkEmail(email: string): Promise<User | undefined>;
    activateAccount(uuid: string): Promise<User | null>;
    login(email: string, password: string): Promise<UserLogin | null>;
    getProfile(authorization: string): Promise<object | null>;
}
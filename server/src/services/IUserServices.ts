import { User } from "../entity/User";

export interface UserSaveRequest {
    fullname: string;
    email: string;
    password: string;
    company: string;
    role: string
}

export default interface IUserServices {
    save({ fullname, email, password, company, role }: UserSaveRequest): Promise<User | Error>;
}
import { User } from "../entity/User";

export interface UserSaveRequest {
    name: string;
    email: string;
    password: string;
}

export default interface IUserServices {
    save({ name, email, password }: UserSaveRequest): Promise<User | Error>;
}
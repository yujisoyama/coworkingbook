import { User } from "../entity/User";

interface Request {
    name: string;
    email: string;
    password: string;
}

export default interface IUserServices {
    save({ name, email, password }: Request): Promise<User | Error>;
}
import { User } from "../entity/User";
import { userRepository } from "../repositories/UserRepository";
import IUserServices from "./IUserServices";

interface Request {
    name: string;
    email: string;
    password: string;
}

class UserServices implements IUserServices {
    async save({ name, email, password }: Request): Promise<User | Error> {
        const newUser = userRepository.create({ name, email, password });
        if (await userRepository.findOneBy({ email })) {
            return Error("This e-mail is already being used");
        }

        await userRepository.save(newUser);
        return newUser;
    }
}

const userServices: UserServices = new UserServices();
export default userServices;
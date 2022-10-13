import { User } from "../entity/User";
import { userRepository } from "../repositories/UserRepository";
import IUserServices, { UserSaveRequest } from "./IUserServices";

class UserServices implements IUserServices {
    async save({ name, email, password }: UserSaveRequest): Promise<User | Error> {
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
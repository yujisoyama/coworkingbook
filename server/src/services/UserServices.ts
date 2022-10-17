import { User } from "../entity/User";
import { userRepository } from "../repositories/UserRepository";
import IUserServices, { UserSaveRequest } from "./IUserServices";

class UserServices implements IUserServices {
    async save({ fullname, email, password, company, role }: UserSaveRequest): Promise<User | Error> {
        const newUser = userRepository.create({ fullname, email, password, company, role });
        if (await userRepository.findOneBy({ email })) {
            return Error("This e-mail is already being used");
        }

        await userRepository.save(newUser);
        return newUser;
    }
}

const userServices: UserServices = new UserServices();
export default userServices;
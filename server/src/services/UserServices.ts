import { SelectQueryBuilder } from "typeorm";
import { User } from "../entity/User";
import { userRepository } from "../repositories/UserRepository";
import IUserServices, { UserSaveRequest } from "./IUserServices";

class UserServices implements IUserServices {
    async save({ fullname, email, password, company, role }: UserSaveRequest): Promise<User> {
        const newUser = userRepository.create({ fullname, email, password, company, role });
        await userRepository.save(newUser);
        return newUser;
    }

    async checkEmail(email: string): Promise<User | undefined> {
        const user = await userRepository.findOneBy({ email });
        if (user) {
            return user;
        } else {
            return undefined;
        }
    }

    async activateAccount(email: string): Promise<User | null> {
        await userRepository.createQueryBuilder()
            .update(User)
            .set({ confirmed: true })
            .where("email = :email", { email: email })
            .execute();

        const user = await userRepository.createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .getOne();

        return user;
    }
}

const userServices: UserServices = new UserServices();
export default userServices;
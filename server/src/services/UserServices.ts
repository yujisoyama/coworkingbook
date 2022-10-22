import { resolve } from "path";
import { User } from "../entity/User";
import { sendEmail } from "../mail";
import { userRepository } from "../repositories/UserRepository";
import IUserServices, { UserSaveRequest } from "./IUserServices";

class UserServices implements IUserServices {
    async save({ fullname, email, hashedPassword, company, role }: UserSaveRequest): Promise<User> {
            const password = hashedPassword;
            const newUser = userRepository.create({ fullname, email, password, company, role });
            await userRepository.save(newUser);
            sendEmail(newUser.uuid, newUser.email, newUser.fullname);
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

    async activateAccount(uuid: string): Promise<User | null> {
        let user = await userRepository.createQueryBuilder("user")
            .where("user.uuid = :uuid", { uuid: uuid })
            .getOne();

        if (user?.confirmed) {
            return user;
        } else {
            user = await userRepository.createQueryBuilder("user")
                .where("user.uuid = :uuid", { uuid: uuid })
                .getOne();

            await userRepository.createQueryBuilder()
                .update(User)
                .set({ confirmed: true })
                .where("uuid = :uuid", { uuid: uuid })
                .execute();

            return user;
        }

    }
}

const userServices: UserServices = new UserServices();
export default userServices;
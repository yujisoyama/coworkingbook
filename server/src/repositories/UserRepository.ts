import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const UserRepository = AppDataSource.getRepository(User)
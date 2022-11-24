import { AppDataSource } from "../data-source";
import { Period } from "../entities/Period";

export const periodRepository = AppDataSource.getRepository(Period);
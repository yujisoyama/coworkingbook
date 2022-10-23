import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

export const bookRepository = AppDataSource.getRepository(Book)
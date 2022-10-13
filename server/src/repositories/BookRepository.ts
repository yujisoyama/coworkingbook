import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export const bookRepository = AppDataSource.getRepository(Book)
import { Request, Response, Router } from "express";
import bookControllers from "./controllers/BookControllers";
import userControllers from "./controllers/UserControllers";
import bookServices from "./services/BookServices";
import userServices from "./services/UserServices";

const routes = Router();

routes.post('/user', (req: Request, res: Response) => {
    userControllers.create(req, res, userServices);
});

routes.post('/book', (req: Request, res: Response) => {
    bookControllers.create(req, res, bookServices);
});

export default routes

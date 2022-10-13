import { Request, Response, Router } from "express";
import userController from "./controllers/UserController";
import userServices from "./services/UserServices";

const routes = Router();

routes.post('/user', (req: Request, res: Response) => {
    userController.create(req, res, userServices);
});

export default routes

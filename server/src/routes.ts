import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.post('/user', new UserController().create);

export default routes
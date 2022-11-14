import { Request, Response, Router } from "express";
import bookControllers from "./controllers/BookControllers";
import userControllers from "./controllers/UserControllers";
import { authMiddleware } from "./middleware/auth";
import bookServices from "./services/BookServices";
import userServices from "./services/UserServices";


const routes = Router();

routes.get('/', (req: Request, res: Response) => { res.send('Coworking Book Server') });
routes.post('/user', (req: Request, res: Response) => { userControllers.create(req, res, userServices); });
routes.get('/user/:email', (req: Request, res: Response) => { userControllers.checkEmail(req, res, userServices); })
routes.get('/user/active/:uuid', (req: Request, res: Response) => { userControllers.activateAccount(req, res, userServices); });
routes.post('/login', (req: Request, res: Response) => { userControllers.login(req, res, userServices) });


routes.use(authMiddleware);
//routes.get('/profile', authMiddleware, (req: Request, res: Response) => { userControllers.getProfile(req, res, userServices) });
routes.get('/profile', (req: Request, res: Response) => { userControllers.getProfile(req, res) });
routes.post('/book', (req: Request, res: Response) => { bookControllers.create(req, res, bookServices); });
routes.post('/book/available', (req: Request, res: Response) => { bookControllers.getAvailability(req, res, bookServices) });
routes.get('/book/upcoming/:userId/:todayDate', (req: Request, res: Response) => { bookControllers.getUpcomingBooks(req, res, bookServices); });
routes.delete('/book/cancel/:bookId', (req: Request, res: Response) => { bookControllers.cancelUpcomingBook(req, res, bookServices); });



export default routes;

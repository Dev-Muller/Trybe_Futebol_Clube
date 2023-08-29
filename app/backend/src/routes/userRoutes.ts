import { Router } from 'express';
import userController from '../controller/userController';
import UserValidation from '../Middlewears/userMiddlewear';

const userRoutes = Router();

userRoutes.post('/login', UserValidation.validateLogin, userController.userLogin);

export default userRoutes;

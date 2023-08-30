import { Router } from 'express';
import userController from '../controller/userController';
import UserValidation from '../Middlewears/userMiddlewear';
import UserAuth from '../Middlewears/authMiddlewear';

const userRoutes = Router();

userRoutes.post('/login', UserValidation.validateLogin, userController.userLogin);
userRoutes.get('/login/role', UserAuth.validateToken, userController.userRole);

export default userRoutes;

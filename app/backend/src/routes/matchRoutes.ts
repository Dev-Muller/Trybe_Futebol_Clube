import { Router } from 'express';
import MatchesController from '../controller/matchController';
import UserAuth from '../Middlewears/authMiddlewear';

const matchRoutes = Router();

matchRoutes.get('/matches', MatchesController.getAllMatches);

matchRoutes.patch('/matches/:id/finish', UserAuth.validateToken, MatchesController.finishMatch);

export default matchRoutes;

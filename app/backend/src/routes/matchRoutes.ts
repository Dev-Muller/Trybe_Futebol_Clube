import { Router } from 'express';
import MatchesController from '../controller/matchController';
import UserAuth from '../Middlewears/authMiddlewear';
import MatchesValidation from '../Middlewears/matchesMiddlewear';

const matchRoutes = Router();

matchRoutes.get('/matches', MatchesController.getAllMatches);

matchRoutes.patch('/matches/:id/finish', UserAuth.validateToken, MatchesController.finishMatch);

matchRoutes.patch('/matches/:id', UserAuth.validateToken, MatchesController.updateGoals);

matchRoutes.post(
  '/matches',
  UserAuth.validateToken,
  MatchesValidation.validateIds,
  MatchesController.createNewMatch,
);

export default matchRoutes;

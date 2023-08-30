import { Router } from 'express';
import MatchesController from '../controller/matchController';

const matchRoutes = Router();

matchRoutes.get('/matches', MatchesController.getAllMatches);

// matchRoutes.get('/matches?inProgress=true', MatchesController.matchInProgress);

export default matchRoutes;

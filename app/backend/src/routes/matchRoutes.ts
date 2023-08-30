import { Router } from 'express';
import MatchesController from '../controller/matchController';

const matchRoutes = Router();

matchRoutes.get('/matches', MatchesController.getAllMatches);

export default matchRoutes;

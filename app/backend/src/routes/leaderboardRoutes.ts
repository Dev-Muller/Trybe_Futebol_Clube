import { Router } from 'express';
import LeaderboardController from '../controller/leaderboardsController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/leaderboard/home', LeaderboardController.getHomeScore);

export default leaderboardRoutes;

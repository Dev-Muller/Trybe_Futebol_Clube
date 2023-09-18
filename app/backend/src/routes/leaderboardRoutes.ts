import { Router } from 'express';
import LeaderboardController from '../controller/leaderboardsController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/leaderboard/home', LeaderboardController.getHomeScore);

leaderboardRoutes.get('/leaderboard/away', LeaderboardController.getAwayScore);
leaderboardRoutes.get('/leaderboard', LeaderboardController.leaderboard);

export default leaderboardRoutes;

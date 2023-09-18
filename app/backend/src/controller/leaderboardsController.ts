import { Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboardsService';

export default class LeaderboardController {
  static async getHomeScore(request: Request, response: Response): Promise<Response> {
    const { status, data } = await LeaderboardsService.getHomeTeams();
    return response.status(status).json(data);
  }

  static async getAwayScore(request: Request, response: Response): Promise<Response> {
    const { status, data } = await LeaderboardsService.getAwayTeams();
    return response.status(status).json(data);
  }

  static async leaderboard(request: Request, response: Response): Promise<Response> {
    const { status, data } = await LeaderboardsService.leaderboard();
    return response.status(status).json(data);
  }
}

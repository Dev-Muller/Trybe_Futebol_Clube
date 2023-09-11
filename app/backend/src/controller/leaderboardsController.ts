import { Request, Response } from 'express';
import LeaderboardsService from '../services/leaderboardsService';

export default class LeaderboardController {
  static async getHomeScore(request: Request, response: Response): Promise<Response> {
    const { status, data } = await LeaderboardsService.getHomeTeams();
    return response.status(status).json(data);
  }
}

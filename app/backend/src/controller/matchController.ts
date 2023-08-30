import { Request, Response } from 'express';
import MatchService from '../services/matchesService';

export default class MatchesController {
  static async getAllMatches(request: Request, response: Response): Promise<Response> {
    const { status, data } = await MatchService.getAllMatches();
    return response.status(status).json(data);
  }
}

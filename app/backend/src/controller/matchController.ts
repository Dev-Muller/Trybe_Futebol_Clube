import { Request, Response } from 'express';
import MatchService from '../services/matchesService';

export default class MatchesController {
  static async getAllMatches(request: Request, response: Response): Promise<Response> {
    const { inProgress } = request.query;
    // console.log(variavel);
    if (inProgress !== undefined && typeof inProgress === 'string') {
      const { status, data } = await MatchService.matchInProgress(inProgress);
      return response.status(status).json(data);
    }
    const { status, data } = await MatchService.getAllMatches();
    return response.status(status).json(data);
  }

  static async finishMatch(request: Request, response: Response): Promise<Response> {
    const { status, data } = await MatchService.finishMatch(request.params.id);
    return response.status(status).json(data);
  }
}

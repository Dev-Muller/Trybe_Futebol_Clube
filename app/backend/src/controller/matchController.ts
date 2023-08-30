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

  // static async matchInProgress(request: Request, response: Response): Promise<Response> {
  //   const variavel = request.query.inProgress;
  //   const { status, data } = await MatchService.matchInProgress(variavel as string);
  //   return response.status(status).json(data);
  // }
}

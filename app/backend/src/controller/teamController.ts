import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

export default class TeamsController {
  static async getAllTeams(request: Request, response: Response): Promise<Response> {
    const { status, data } = await teamsService.getAllTeams();
    return response.status(status).json(data);
  }
}
// async function findAllTeams(request: Request, response: Response): Promise<Response> {
//   const { status, data } = await teamsService.findAllTeams();
//   return response.status(status).json(data);
// }

// export default {
//   findAllTeams,
// };

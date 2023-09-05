import { NextFunction, Request, Response } from 'express';
import Team from '../database/models/teamsModel';

export default class MatchesValidation {
  static async validateIds(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    const homeId = await Team.findByPk(homeTeamId);
    const awayId = await Team.findByPk(awayTeamId);
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (!homeId || !awayId) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}

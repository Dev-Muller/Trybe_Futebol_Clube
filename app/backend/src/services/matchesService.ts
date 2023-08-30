import Team from '../database/models/teamsModel';
import Match from '../database/models/matchesModel';
import { Status } from '../types/status';

export default class MatchService {
  static async getAllMatches(): Promise<Status> {
    const matches = await Match.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        {
          model: Team, as: 'awayTeam', attributes: { exclude: ['id'] },
        }],
    });
    return { status: 200, data: matches };
  }
}

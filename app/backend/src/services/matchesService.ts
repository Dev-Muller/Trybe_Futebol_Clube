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

  static async matchInProgress(inProgress: string): Promise<Status> {
    const matches = await Match.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    // console.log('*******', matches);

    if (inProgress === 'true') {
      const filteredMatches = matches.filter((match) => match.dataValues.inProgress === true);
      return { status: 200, data: filteredMatches };
    }
    const filteredMatches = matches.filter((match) => match.dataValues.inProgress === false);
    return { status: 200, data: filteredMatches };
  }

  static async finishMatch(id: string): Promise<Status> {
    await Match.update({ inProgress: false }, { where: { id } });
    return { status: 200, data: { message: 'Finished' } };
  }

  static async updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Status> {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    const updatedMatch = await Match.findByPk(id);
    return { status: 200, data: { updatedMatch } };
  }
}

import Team from '../database/models/teamsModel';
import Match from '../database/models/matchesModel';
import { Status } from '../types/status';
import getTeamScores from '../utils/functions';

export default class LeaderboardService {
  static async getHomeTeams(): Promise<Status> {
    const getAllTeams = await Team.findAll();
    // console.log('allteam', getAllTeams);
    const mapTeams = getAllTeams.map(async (team) => {
      const matches = await Match.findAll({ where: { inProgress: false, homeTeamId: team.id } });
      const mapMatches = matches.map((match) => getTeamScores(team.teamName, [match]));
      const index = mapMatches[mapMatches.length - 1];
      return { ...index };
    });
    const data = await Promise.all(mapTeams);
    return { status: 200, data };
  }

  // static async updateBoard(): Promise<Status> {
  //   const matches = await Match.findAll();
  //   const matchesMap = matches.map(async (match) => {
  //     const leaderboard = await getTeamNames();
  //     match.homeTeamId === leaderboard.
  //   });
  // }
}

import Team from '../database/models/teamsModel';
import Match from '../database/models/matchesModel';
import { Status } from '../types/status';
import getTeamScores from '../utils/functions';
import getAwayScores from '../utils/functionsAwayTeam';
import leaderboardTeams from '../utils/leaderboard';
import sortFunction from '../utils/order';

export default class LeaderboardService {
  static async getHomeTeams(): Promise<Status> {
    const getAllTeams = await Team.findAll();
    // console.log('allteam', getAllTeams);
    const mapTeams = getAllTeams.map(async (team) => {
      const matches = await Match.findAll({ where: { inProgress: false, homeTeamId: team.id } });
      const mapMatches = matches.map((match) => getTeamScores(team.teamName, [match]));
      const index = mapMatches[mapMatches.length - 1];
      // console.log(index.totalGames);
      return { ...index };
    });
    const data = await Promise.all(mapTeams);
    const variavel = data.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 200, data: variavel };
  }

  static async getAwayTeams(): Promise<Status> {
    const getAllTeams = await Team.findAll();
    // console.log('allteam', getAllTeams);
    const mapTeams = getAllTeams.map(async (team) => {
      const matches = await Match.findAll({ where: { inProgress: false, awayTeamId: team.id } });
      const mapMatches = matches.map((match) => getAwayScores(team.teamName, [match]));
      const index = mapMatches[mapMatches.length - 1];
      return { ...index };
    });
    const data = await Promise.all(mapTeams);
    const variavel = data.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
      if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
    return { status: 200, data: variavel };
  }

  static async leaderboard(): Promise<Status> {
    const homeTeams = await this.getHomeTeams();
    const awayTeams = await this.getAwayTeams();
    const sumTeams = leaderboardTeams(awayTeams.data as any, homeTeams.data as any);
    // console.log(sumTeams);
    // const data = await Promise.all(sumTeams);
    const variavel = sortFunction(sumTeams);
    console.log(variavel);

    return { status: 200, data: variavel as unknown as object[] };
  }
}

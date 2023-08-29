import Team from '../database/models/teamsModel';
import { Status } from '../types/status';
// import ITeams from '../Interfaces/Teams';

// async function findAllTeams(): Promise<Status> {
//   const allTeams = await Team.findAll();
//   console.log('log allTeams:', allTeams);

//   return { status: 200, data: allTeams };
// }

export default class TeamService {
  // constructor(
  //   private teamsModel = Team,
  // ) {}

  static async getAllTeams(): Promise<Status> {
    const allTeams = await Team.findAll();
    return { status: 200, data: allTeams };
  }

  static async getOneTeam(id: number): Promise<Status> {
    const oneTeam = await Team.findByPk(id);
    if (!oneTeam) {
      return { status: 404, data: { message: 'team not found' } };
    }
    return { status: 200, data: oneTeam };
  }
  // public async getTeams(): Promise<Status> {
  //   const allTeams = await this.teamsModel.findAll();
  //   return { status: 200, data: allTeams };
  // }
}

// export default {
//   findAllTeams,
// };

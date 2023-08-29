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

  // public async getTeams(): Promise<Status> {
  //   const allTeams = await this.teamsModel.findAll();
  //   return { status: 200, data: allTeams };
  // }
}

// export default {
//   findAllTeams,
// };

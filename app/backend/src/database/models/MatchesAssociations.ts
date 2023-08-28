import Team from './teamsModel';
import Match from './matchesModel';

Match.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' });
Match.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' });

Team.hasMany(Match, { foreignKey: 'homeTeamId' });
Team.hasMany(Match, { foreignKey: 'awayTeamId' });

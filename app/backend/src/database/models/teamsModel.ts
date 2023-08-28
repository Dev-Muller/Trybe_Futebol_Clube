import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import Match from './matchesModel';

export default class Team extends Model<InferAttributes<Team>,
InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

// Team.hasMany(Match, { foreignKey: 'home_team_id', as: 'homeTeam' });
// Team.hasMany(Match, { foreignKey: 'away_team_id', as: 'awayTeam' });

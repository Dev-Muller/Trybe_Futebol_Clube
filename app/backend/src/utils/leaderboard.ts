import newScore from '../Interfaces/newInterface';

interface TeamScore {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

const calculateTeamScore = (matchAway: newScore, matchHome: newScore): TeamScore => {
  const score: TeamScore = {
    name: matchHome.name,
    totalPoints: matchHome.totalPoints + matchAway.totalPoints,
    totalGames: matchHome.totalGames + matchAway.totalGames,
    totalVictories: matchHome.totalVictories + matchAway.totalVictories,
    totalDraws: matchHome.totalDraws + matchAway.totalDraws,
    totalLosses: matchHome.totalLosses + matchAway.totalLosses,
    goalsFavor: matchHome.goalsFavor + matchAway.goalsFavor,
    goalsOwn: matchHome.goalsOwn + matchAway.goalsOwn,
    goalsBalance: matchHome.goalsFavor + matchAway
      .goalsFavor - matchHome.goalsOwn - matchAway.goalsOwn,
    efficiency: ((matchHome.totalPoints + matchAway
      .totalPoints) / ((matchHome.totalGames + matchAway.totalGames) * 3)) * 100,
  };

  score.efficiency = parseFloat(score.efficiency.toFixed(2));

  return score;
};

const leaderboardTeams = (matchesAway: newScore[], matchesHome: newScore[]) =>
  matchesAway.reduce((teamScores: TeamScore[], matchAway) => {
    const matchHome = matchesHome.find((mh) => mh.name === matchAway.name);
    if (matchHome) teamScores.push(calculateTeamScore(matchAway, matchHome));
    return teamScores;
  }, []);

export default leaderboardTeams;

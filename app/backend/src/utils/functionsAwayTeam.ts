import IMatches from '../Interfaces/Matches';

const score = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  // goalsBalance: 0,
  // efficiency: '0.00',
};

function updatingVictory(homeGoals: number, awayGoals: number) {
  score.totalPoints += 3;
  score.totalVictories += 1;
  score.goalsOwn += homeGoals;
  score.goalsFavor += awayGoals;
}

function updatingLosses(homeGoals: number, awayGoals: number) {
  score.totalLosses += 1;
  score.goalsOwn += homeGoals;
  score.goalsFavor += awayGoals;
}

function updatingDraws(homeGoals: number, awayGoals: number) {
  score.totalPoints += 1;
  score.totalDraws += 1;
  score.goalsOwn += homeGoals;
  score.goalsFavor += awayGoals;
}

// function updateEfficiency() {
//   score.efficiency = `${(score.totalPoints / (score.totalGames * 3)) * 100}`;
//   score.goalsBalance = score.goalsFavor - score.goalsOwn;
// }

function updateAll(matches: IMatches[]) {
  matches.forEach((match: IMatches) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      return updatingVictory(match.homeTeamGoals, match.awayTeamGoals);
    }
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return updatingLosses(match.homeTeamGoals, match.awayTeamGoals);
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return updatingDraws(match.homeTeamGoals, match.awayTeamGoals);
    }
  });
}

export default function getAwayScores(name: string, scores: IMatches[]) {
  score.name = name;
  score.totalGames += 1;
  // updateEfficiency();
  updateAll(scores);

  return score;
}

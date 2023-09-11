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
};

function updatingVictory(homeGoals: number, awayGoals: number) {
  score.totalPoints += 3;
  score.totalVictories += 1;
  score.goalsFavor += homeGoals;
  score.goalsOwn += awayGoals;
}

function updatingLosses(homeGoals: number, awayGoals: number) {
  score.totalLosses += 1;
  score.goalsFavor += homeGoals;
  score.goalsOwn += awayGoals;
}

function updatingDraws(homeGoals: number, awayGoals: number) {
  score.totalPoints += 1;
  score.totalDraws += 1;
  score.goalsFavor += homeGoals;
  score.goalsOwn += awayGoals;
}

function updateAll(matches: IMatches[]) {
  matches.forEach((match: IMatches) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      return updatingVictory(match.homeTeamGoals, match.awayTeamGoals);
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      return updatingLosses(match.homeTeamGoals, match.awayTeamGoals);
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      return updatingDraws(match.homeTeamGoals, match.awayTeamGoals);
    }
  });
}

export default function getTeamScores(name: string, scores: IMatches[]) {
  score.name = name;
  score.totalGames += 1;
  updateAll(scores);

  return score;
}

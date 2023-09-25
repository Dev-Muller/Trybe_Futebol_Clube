import IMatches from '../Interfaces/Matches';
// import newScore from '../Interfaces/newInterface';

const score = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
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

function updateEfficiency(points:number, games: number) {
  score.efficiency = (points / (games * 3)) * 100;
  score.efficiency = Number(score.efficiency.toFixed(2));
  score.goalsBalance = score.goalsFavor - score.goalsOwn;
}

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

function resetScore() {
  score.totalGames = 0;
  score.totalPoints = 0;
  score.totalVictories = 0;
  score.totalDraws = 0;
  score.totalLosses = 0;
  score.goalsFavor = 0;
  score.goalsOwn = 0;
  score.goalsBalance = 0;
  score.efficiency = 0;
}

// export function sortScores(scores: newScore[]) {
//   const objeto = scores.sort((a, b) => {
//     if (a.totalPoints > b.totalPoints) {
//       console.log('************************************');
//       return -1;
//     }
//     if (a.totalPoints < b.totalPoints) {
//       console.log('----------------------------------');
//       return 1;
//     }
//     return 0;
//   });
//   return objeto;
// }

export default function getAwayScores(name: string, scores: IMatches[]) {
  if (name !== score.name) {
    resetScore();
  }
  score.name = name;
  score.totalGames += 1;
  // updateEfficiency();
  updateAll(scores);
  updateEfficiency(score.totalPoints, score.totalGames);
  // console.log(score);
  // sortScores([score]);
  return score;
}

export { updateAll, updatingVictory, updatingLosses, updatingDraws };

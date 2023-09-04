const matchesTeamsMocks = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]

const createdMatchMock = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}

const createMatchBody = {
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const createFalseMatchMock = {
  "homeTeamId": 8,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const createdWrongIdMock = {
  "homeTeamId": 999,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

export default matchesTeamsMocks;
export { createdMatchMock, createMatchBody, createFalseMatchMock, createdWrongIdMock };
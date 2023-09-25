import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
// import token from '../utils/jwt';
import Match from '../database/models/matchesModel';
import getTeamScores from '../utils/functions';
import getAwayScores from '../utils/functionsAwayTeam';
import { updatingVictory, resetScore, updateAll, updateEfficiency, updatingDraws, updatingLosses } from '../utils/functions';
// import { updatingVictory, resetScore, updateAll, updateEfficiency, updatingDraws, updatingLosses } from '../utils/functionsAwayTeam';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('leaderboard Test', function() {
  beforeEach(() => {
    sinon.restore();
  });

  it('should find all home teams leaderboard', async () => {
    sinon.stub(Match, 'findAll').resolves([]);
    const { status } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
  });
  it('should find all away teams leaderboard', async () => {
    sinon.stub(Match, 'findAll').resolves([]);
    const { status } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
  });
  it('should find all teams leaderboard', async () => {
    sinon.stub(Match, 'findAll').resolves([]);
    const { status } = await chai.request(app).get('/leaderboard');

    expect(status).to.equal(200);
  });
  it('should use unit test for getTeamsScores', async () => {
    const request = getTeamScores('test', []);
    expect(request).to.be.an('object');
  });
  it('should use unit test for getAwayScores', async () => {
    const request = getAwayScores('test', []);
    expect(request).to.be.an('object');
  });

  it('unite test for others functions from home team leaderboard', async () => {
    updatingVictory(9, 8)
    updatingLosses(1, 2)
    updatingDraws(1, 1)
    updateAll([])
    updateEfficiency(1, 1)
    resetScore()
  });
});
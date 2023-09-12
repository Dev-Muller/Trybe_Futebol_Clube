import * as sinon from 'sinon';
import * as chai from 'chai';
// import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
// import token from '../utils/jwt';
import Match from '../database/models/matchesModel';

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
});
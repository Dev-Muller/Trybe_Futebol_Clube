import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
// import token from '../utils/jwt';
import Match from '../database/models/matchesModel';
import matchesTeamsMocks from './mocks/match.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('users Test', function() {
  it('should login a user', async function() {
    sinon.stub(Match, 'findAll').resolves(matchesTeamsMocks as any);
    const { status } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
  });
});
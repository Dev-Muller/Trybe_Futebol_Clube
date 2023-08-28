import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import Team from '../../src/database/models/teamsModel';
import mockTeams from '../tests/mocks/team.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams Test', function() {
  it('should return all teams', async function() {
    sinon.stub(Team, 'findAll').resolves(mockTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeams);
  });
});
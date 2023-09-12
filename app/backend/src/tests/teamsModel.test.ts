import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import Team from '../../src/database/models/teamsModel';
import mockTeams from '../tests/mocks/team.mocks';
import oneTeam from '../tests/mocks/team.mocks';

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

  it('should return one team', async function () {
    sinon.stub(Team, 'findOne').resolves(oneTeam as any);
    const { status, body } = await chai.request(app).get('/teams/5');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(oneTeam);
  })

  it('should not return one team', async function () {
    sinon.stub(Team, 'findByPk').resolves();
    const { status, body } = await chai.request(app).get('/teams/99');

    expect(status).to.equal(404);
  })
});
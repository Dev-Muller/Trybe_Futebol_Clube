import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
// import token from '../utils/jwt';
import Match from '../database/models/matchesModel';
import matchesTeamsMocks, { createFalseMatchMock, createMatchBody, createdMatchMock, createdWrongIdMock } from './mocks/match.mocks';
import { userTokenMock } from './mocks/user.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('matches Test', function() {
  beforeEach(() => {
    sinon.restore();
  });

  it('should find all matches', async function() {
    sinon.stub(Match, 'findAll').resolves(matchesTeamsMocks as any);
    const { status } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
  });
  it('should create a new match', async function() {
    sinon.stub(jwt, 'verify').resolves({email: 'admin@admin.com'})
    sinon.stub(Match, 'create').resolves(createdMatchMock as any);
    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('Authorization', userTokenMock)
      .send(createMatchBody);

    expect(status).to.equal(201);
    // expect(body).to.be.deep.equal(createdMatchMock);
  });
  it('should not create a new match with two equals teams Ids', async function() {
    sinon.stub(jwt, 'verify').resolves({email: 'admin@admin.com'})
    sinon.stub(Match, 'create').resolves(createdMatchMock as any);
    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('Authorization', userTokenMock)
      .send(createFalseMatchMock);

    expect(status).to.equal(422);
    // expect(body).to.equal({ "message": "It is not possible to create a match with two equal teams" });
  });
  it('should not create a new match with a unexistent team Id', async function() {
    sinon.stub(jwt, 'verify').resolves({email: 'admin@admin.com'})
    sinon.stub(Match, 'create').resolves(createdMatchMock as any);
    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('Authorization', userTokenMock)
      .send(createdWrongIdMock);

    expect(status).to.equal(404);
    // expect(body).to.equal({ "message": "There is no team with such id!" });
  });
  it('should find all matches in progress', async function() {
    sinon.stub(jwt, 'verify').resolves({email: 'admin@admin.com'})
    sinon.stub(Match, 'findAll').resolves([]);
    const { status } = await chai.request(app).get('/matches?inProgress=true').set('Authorization', userTokenMock);

    expect(status).to.equal(200);
  });
  it('should find all matches that arent in progress', async function() {
    // sinon.stub(jwt, 'verify').resolves({email: 'admin@admin.com'})
    sinon.stub(Match, 'findAll').resolves([]);
    const { status } = await chai.request(app).get('/matches?inProgress=false');
    // .set('Authorization', userTokenMock);

    expect(status).to.equal(200);
  });
  it('should finish a match', async function() {
    sinon.stub(jwt, 'verify').resolves({email: 'admin@admin.com'});
    sinon.stub(Match, 'update').resolves();
    const { status } = await chai.request(app).patch('/matches/1/finish').set('Authorization', userTokenMock);

    expect(status).to.equal(200);
  });
  it('should update goals', async function() {
    sinon.stub(jwt, 'verify').resolves({email: 'admin@admin.com'});
    sinon.stub(Match, 'update').resolves();
    const { status } = await chai.request(app).patch('/matches/1').set('Authorization', userTokenMock)
    .send({ homeTeamGoals: 1, awayTeamGoals: 1 });
    
    expect(status).to.equal(200);
  });
});
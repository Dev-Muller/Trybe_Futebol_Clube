import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
// import token from '../utils/jwt';
import Match from '../database/models/matchesModel';
import matchesTeamsMocks, { createFalseMatchMock, createMatchBody, createdMatchMock, createdWrongIdMock } from './mocks/match.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('users Test', function() {
  it('should login a user', async function() {
    sinon.stub(Match, 'findAll').resolves(matchesTeamsMocks as any);
    const { status } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
  });
  it('should create a new match', async function() {
    sinon.stub(Match, 'create').resolves(createdMatchMock as any);
    const { status, body } = await chai.request(app).post('/matches').send(createMatchBody);

    expect(status).to.equal(201);
    expect(body).to.be.deep.equal(createdMatchMock);
  });
  it('should not create a new match with two equals teams Ids', async function() {
    sinon.stub(Match, 'create').resolves(createdMatchMock as any);
    const { status, body } = await chai.request(app).post('/matches').send(createFalseMatchMock);

    expect(status).to.equal(422);
    expect(body).to.equal({ "message": "It is not possible to create a match with two equal teams" });
  });
  it('should not create a new match with a unexistent team Id', async function() {
    sinon.stub(Match, 'create').resolves(createdMatchMock as any);
    const { status, body } = await chai.request(app).post('/matches').send(createdWrongIdMock);

    expect(status).to.equal(404);
    expect(body).to.equal({ "message": "There is no team with such id!" });
  });
});
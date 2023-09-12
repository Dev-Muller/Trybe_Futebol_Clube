import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import User from '../database/models/usersModel'
import { tokenPayloadMock, userMock, userTokenMock } from './mocks/user.mocks';
import token from '../utils/jwt';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('users Test', function() {
  beforeEach(() => {
    sinon.restore();
  });

  it('should login a user', async function() {
    sinon.stub(User, 'findOne').resolves(userMock as any);
    sinon.stub(token, 'generateToken').returns(userTokenMock)
    const { status } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(status).to.equal(200);
  });

  it('should return a error for email', async function() {
    sinon.stub(User, 'findOne').resolves();
    const { status } = await chai.request(app).post('/login').send({
      password: 'secret_admin',
    });

    expect(status).to.equal(400);
  });
  it('should return a unonexistent password', async function() {
    sinon.stub(User, 'findOne').resolves();
    const { status } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
    });

    expect(status).to.equal(400);
  });
  it('should return a error for wrong email', async function() {
    sinon.stub(User, 'findOne').resolves();
    const { status } = await chai.request(app).post('/login').send({
      email: 'admin@admin1234.com',
      password: 'secret_admin',
    });

    expect(status).to.equal(401);
  });
  it('should tell what is the role of the user', async function() {
    sinon.stub(User, 'findOne').resolves(userMock as any);
    sinon.stub(token, 'verifyToken').returns(tokenPayloadMock)
    const { status } = (await chai.request(app).get('/login/role').set('authorization', 'string token'));

    expect(status).to.equal(200);
  })
  it('should have user error on role', async function() {
    sinon.stub(User, 'findOne').resolves();
    sinon.stub(token, 'verifyToken').returns(tokenPayloadMock)
    const { status } = (await chai.request(app).get('/login/role').set('authorization', 'string token'));

    expect(status).to.equal(403);
  })
  it('should token have  error ', async function() {
    sinon.stub(User, 'findOne').resolves();
    sinon.stub(token, 'verifyToken').returns({email: 'adminBro@email.com'})
    const { status } = (await chai.request(app).get('/login/role'));

    expect(status).to.equal(401);
  })
  it('should be a invalid token', async function() {
    sinon.stub(User, 'findOne').resolves();
    sinon.stub(token, 'verifyToken').returns({email: 'adminBro@email.com'})
    const { status } = (await chai.request(app).get('/login/role').set('Authorization', 'larissaodamassa'));

    expect(status).to.equal(401);
  })

  it('should return a error for invalid mail', async function() {
    sinon.stub(User, 'findOne').resolves();
    const { status } = await chai.request(app).post('/login').send({
      email: 'adminadmin.com',
      password: 'secret_admin',
    });

    expect(status).to.equal(401);
  });
  it('should return a error for wrong password', async function() {
    sinon.stub(User, 'findOne').resolves();
    const { status } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secr',
    });

    expect(status).to.equal(401);
  });
});
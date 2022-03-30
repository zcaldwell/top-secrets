const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const User = require('../lib/models/User');

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ username: 'watson', password: 'isadog' });
    expect(res.body).toEqual({ id: expect.any(String), username: 'watson' });
  });

  it('signs in a user', async () => {
    const user = await UserService.create({
      username: 'watson',
      password: 'isadog',
    });

    const res = await request(app)
      .post('/api/v1/users/session')
      .send({ username: 'watson', password: 'isadog' });

    expect(res.body).toEqual({ message: 'Signed in successfully!', user });
  });

  it('Delete logs out a user', async () => {
    const agent = request.agent(app);

    await UserService.create({
      username: 'watson',
      password: 'isadog',
    });

    await agent
      .post('/api/v1/users/session')
      .send({ username: 'watson', password: 'isadog' });

    const res = await agent.delete('/api/v1/users/sessions');

    expect(res.body).toEqual({ message: 'Logged Out' });
  });

  it('allows logged in user to view secrets', async () => {
    const agent = request.agent(app);

    await UserService.create({
      username: 'watson',
      password: 'isadog',
    });

    let res = await agent.get('/api/v1/secrets');

    expect(res.status).toEqual(401);

    await agent
      .post('/api/v1/users/sessions')
      .send({ username: 'watson', password: 'isadog' });

    res = await agent.get('/api/v1/secrets');

    expect(res.status).toEqual(200);
  });
});

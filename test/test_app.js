import chai from 'chai';
import request from 'supertest';
import AppPromise from '../server/test';
import l from '../server/common/logger';
import q from 'querystring';

const expect = chai.expect;
const assert = chai.assert;

let app = null;

before(async () => {
  try {
    app = await AppPromise();
  } catch (err) {
    l.error(err);
    process.exit(-1);
  }
});

const flow = async () => {
  let r = await request(app)
    .post('/api/v1/user/signup')
    .expect('Content-Type', /json/)
    .send({
      name: 'Борис Колесников',
      email: 'kolesnikov.boris@gmail.com',
      password: '111',
    });

  expect(r.header)
    .to.be.an.an('object')
    .that.has.property('x-auth-token');

  expect(r.body)
    .to.be.an.an('object')
    .that.has.property('_id');

  l.info('Loggin in');
  r = await request(app)
    .post('/api/v1/user/login')
    .expect('Content-Type', /json/)
    .send({
      email: 'kolesnikov.boris@gmail.com',
      password: '111',
    });

  expect(r.body)
    .to.be.an.an('object')
    .that.has.property('_id');

  const auth_token = r.header['x-auth-token'];
  /*
  const qq = q.stringify({ q: 'parliamo italiano' });

  r = await request(app)
    .get(`/api/v1/main/search?${qq}`)
    .set({ authorization: auth_token })
    .expect('Content-Type', /json/);

   */

  //l.debug(r.body);

  r = await request(app)
    .post('/api/v1/main/stats')
    .set({ authorization: auth_token })
    .expect('Content-Type', /json/)
    .send({
      searchString: 'hara medaber',
      videoId: 'ffaazzll_',
      thumbUrl: 'https://fuck.me/com',
      videoDuration: 0,
    });

  r = await request(app)
    .get('/api/v1/admin')
    .set({ authorization: auth_token })
    .expect('Content-Type', /json/);

  assert(r.status === 401, 'code should be 401');

  r = await request(app)
    .get('/api/v1/main/setadmin')
    .set({ authorization: auth_token })
    .expect('Content-Type', /json/);

  r = await request(app)
    .get('/api/v1/admin')
    .set({ authorization: auth_token })
    .expect('Content-Type', /json/);

  assert(r.status === 200, 'code should be 200 because this is admin');
  l.debug(r.body)
};

const tryAccess = async () => {
  const r = await request(app)
    .post(`/api/v1/user/login`)
    .expect('Content-Type', /json/)
    .send({});

  l.debug(r.status);
  assert(r.status === 401, 'code should be 401');
};

describe('App Flow', () => {
  it('Try access', () => tryAccess());

  it('Process flow', () => flow());
});

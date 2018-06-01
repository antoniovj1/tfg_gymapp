const config = require('../../config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Exercise = require('../../backend/models/exercise');
const User = require('../../backend/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { token } = config;

jest.setTimeout(30000);

describe('Stats (/api/training/)', () => {
  let server;

  beforeAll(async () => {
    server = require('../../server');
    await Exercise.remove({});
    await User.remove({});
  });

  beforeEach(async () => {
    await Exercise.remove({});
  });

  afterAll(async () => {
    try {
      await Exercise.remove({});
      await User.remove({});
      await mongoose.disconnect();
      await server.shutdown();
    } catch (error) {
      console.log(` ${error} `);
      throw error;
    }
  });

  describe('/GET/', () => {
    test('should GET topn', done => {
      chai
        .request(server)
        .get(`/api/training/topn`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          done();
        });
    });

    test('should GET totals', done => {
      chai
        .request(server)
        .get(`/api/training/totals`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          done();
        });
    });

    test('should GET musclestats', done => {
      chai
        .request(server)
        .get(`/api/training/musclestats/10`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          done();
        });
    });
  });
});

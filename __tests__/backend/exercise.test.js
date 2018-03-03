const config = require('../../config');

const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

const Session = require('../../app/models/training_session');
const Movement = require('../../app/models/movement');
const Exercise = require('../../app/models/exercise');
const User = require('../../app/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { token } = config;

describe('Exercise (/api/training/exercise/)', () => {
  let server;
  const user = new User({ auth0id: 'ex' });;

  beforeAll(async () => {
    server = require('../../server');

    await Exercise.remove({});
    await Session.remove({});
    await Movement.remove({});
    await User.remove({});
    await user.save();

  });

  afterAll(async () => {
    try {
      await Exercise.remove({});
      await Session.remove({});
      await Movement.remove({});
      await mongoose.disconnect();
      await server.shutdown();
    } catch (error) {
      console.log(` ${error} `);
      throw error;
    }
  });

  describe('/GET/:id_exercise', () => {
    test('should GET the exercise given the exercise id', (done) => {
      const exercise = new Exercise();

      exercise.save((err, exercise) => {
        chai.request(server)
          .get(`/api/training/exercise/${exercise._id}`)
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');

            done();
          });
      });
    })

    test('should fail with incorrect id', (done) => {
      const exercise = new Exercise();

      exercise.save((err, exercise) => {
        chai.request(server)
          .get('/api/training/exercise/' + 'ididididid')
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'fail');
            done();
          });
      });
    })
  });

  describe('/POST ', async () => {
    const movement = new Movement({
      name: "Dominadas",
      material: "Barra",
      muscles: [{ name: "bicep", percentage: 20 },
      { name: "pecho", percentage: 10 },
      { name: "dorsal", percentage: 60 },
      { name: "abdominales", percentage: 10 }]
    });

    const session = new Session({ user: user._id });

    await movement.save();
    await session.save();

    test('should POST an exercise ', (done) => {
      chai.request(server)
        .post(`/api/training/sessions/${session._id}/exercise`)
        .set('x-access-token', token)
        .send({ movement: movement.name })
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('message', 'ok');
          done();
        });
    });

    test('should no POST an exercise without movement', (done) => {
      chai.request(server)
        .post(`/api/training/sessions/${session._id}/exercise/`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('message', 'fail');

          done();
        });
    });

  });


  describe('/DELETE/:id_exercise', () => {
    test('should DELETE a exercise given the id', (done) => {
      const exercise = new Exercise();

      exercise.save((err, exercise) => {
        chai.request(server)
          .delete(`/api/training/exercise/${exercise._id}`)
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body).toHaveProperty('message', 'ok');
            done();
          });
      });
    });
    test('should fail with incorrect id', (done) => {
      const exercise = new Exercise();

      exercise.save((err, exercise) => {
        chai.request(server)
          .delete('/api/training/exercise/' + 'ididididid')
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body).toHaveProperty('message', 'fail');
            done();
          });
      });
    });

  });
});

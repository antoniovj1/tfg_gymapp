const config = require("../../config");

const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Exercise = require("../../backend/models/exercise");
const User = require("../../backend/models/user");

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { token } = config;

describe("Set (/api/training/set/)", () => {
  let server;
  const user = new User({ auth0id: "set" });

  beforeAll(async () => {
    server = require("../../server");
    await Exercise.remove({});
    await User.remove({});
    await user.save();
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

  describe("/GET/:id_exercise", () => {
    test("should GET the sets given the exercise id", done => {
      const exercise = new Exercise();

      exercise.save((err, exercise) => {
        chai
          .request(server)
          .get(`/api/training/exercise/${exercise._id}/set`)
          .set("x-access-token", token)
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe("object");
            expect(res.body).toHaveProperty("message", "ok");
            done();
          });
      });
    });
  });

  // describe('/POST/:id_exercise', () => {
  //     it('should POST a set given the exercise id', (done) => {
  //         let set = {
  //             repetitions: 10,
  //             weight: 80,
  //             rest: 60
  //         }

  //         let exercise = new Exercise();
  //         exercise.save();

  //         chai.request(server)
  //             .post('/api/training/exercise/' + exercise._id + '/set')
  //             .set('x-access-token', token)
  //             .send(set)
  //             .end((err, res) => {
  //                 res.should.have.status(200);
  //                 res.body.should.be.a('object');
  //                 res.body.should.have.property('message').eql('ok');

  //                 done();
  //             });
  //     });

  // });

  describe("/GET/:id_exercise/:num", () => {
    test("should GET a set by the given exercise id and num", done => {
      const ex = new Exercise();

      const set = {
        repetitions: 10,
        weight: 80,
        rest: 60
      };

      ex.sets.push(set);
      ex.save();

      chai
        .request(server)
        .get(`/api/training/exercise/${ex._id}/set/0`)
        .set("x-access-token", token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe("object");
          expect(res.body.set).toHaveProperty("repetitions", set.repetitions);
          expect(res.body.set).toHaveProperty("weight", set.weight);
          done();
        });
    });
  });

  describe("/PUT/byId/:id_set", () => {
    test("it should UPDATE a set given the exercise and num", done => {
      const ex = new Exercise();

      const set = {
        repetitions: 10,
        weight: 80,
        rest: 60
      };

      const set2 = {
        repetitions: 100,
        weight: 800,
        rest: 600
      };

      ex.sets.push(set);
      ex.save();

      chai
        .request(server)
        .put(`/api/training/exercise/${ex._id}/set/0`)
        .set("x-access-token", token)
        .set(set2)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("message", "ok");
          done();
        });
    });
  });

  describe("/DELETE/byId/:id_set", () => {
    test("should DELETE a set given the exercise and num", done => {
      const ex = new Exercise();

      const set = {
        repetitions: 10,
        weight: 80,
        rest: 60
      };

      ex.sets.push(set);
      ex.save();

      chai
        .request(server)
        .delete(`/api/training/exercise/${ex._id}/set/0`)
        .set("x-access-token", token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("message", "ok");

          done();
        });
    });
  });
});

const config = require("../../config");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const User = require("../../backend/models/user");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const { token } = config;

jest.setTimeout(30000);

describe("Users (/api/users/)", () => {
  let server;

  beforeAll(async () => {
    server = require("../../server");
    await User.remove({});
  });

  afterAll(async () => {
    try {
      await User.remove({});
      await mongoose.disconnect();
      await server.shutdown();
    } catch (error) {
      console.log(` ${error} `);
      throw error;
    }
  });

  describe("/GET", () => {
    test("GET all the users", done => {
      chai
        .request(server)
        .get("/api/users")
        .set("x-access-token", token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).toHaveLength(0);
          done();
        });
    });
  });

  // TODO -> Modificar para AUHT0

  // describe('/GET/:user_id', () => {
  //   it('should GET a user by the given id', (done) => {
  //     let user = new User({
  //       name: 'Antonio'
  //     });

  //     user.save((err, user) => {
  //       chai.request(server)
  //         .get('/api/users/' + user._id)
  //         .set('x-access-token', token)
  //         .send(user)
  //         .end((err, res) => {
  //           res.shoul.status).toBe(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('name').eql(user.name);;
  //           done();
  //         });
  //     });
  //   })
  // });

  // describe('/PUT/:user_id', () => {
  //   it('it should UPDATE a user given the id', (done) => {
  //     let user = new User({
  //       name: 'Antonio',

  //     });

  //     user.save((err, user) => {
  //       chai.request(server)
  //         .put('/api/users/' + user._id)
  //         .set('x-access-token', token)
  //         .send({ name: "TEST" })
  //         .end((err, res) => {
  //           res.shoul.status).toBe(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('message').eql('ok');
  //           res.body.user.should.have.property('name').eql('TEST');
  //           done();
  //         });
  //     });
  //   });
  // });

  // describe('/DELETE/:user_id', () => {
  //   it('should DELETE a user given the id', (done) => {
  //     let user = new User({
  //       name: 'Antonio',
  //       password: 'test',
  //       username: 'test'
  //     });

  //     user.save((err, user) => {
  //       chai.request(server)
  //         .delete('/api/users/' + user._id)
  //         .set('x-access-token', token)
  //         .end((err, res) => {
  //           res.shoul.status).toBe(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('message').eql('ok');
  //           done();
  //         });
  //     });
  //   });
  // });
});

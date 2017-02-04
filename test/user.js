var config = require('../config');

let mongoose = require("mongoose");

let User = require('../app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

var user = new User({ name: 'Antonio' });
User.remove({ _id: user._id });
user.save();

var token = config.token;

describe('Users (/api/users/)', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  after((done) => {
    User.remove({ _id: user._id });
    done();
  });

  describe('/GET', () => {
    it('GET all the users', (done) => {
      chai.request(server)
        .get('/api/users')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  //TODO -> Modificar para AUHT0

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
  //           res.should.have.status(200);
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
  //           res.should.have.status(200);
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
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('message').eql('ok');
  //           done();
  //         });
  //     });
  //   });
  // });
});

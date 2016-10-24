let mongoose = require("mongoose");

let User = require('../app_back/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Auth (/api/authenticate)', () => {
  before((done) => {
    User.remove({});
    var user = new User({username: 'auth',password: 'auth'});
    user.save();
    done();
  });

  describe('/POST ', () => {
    it('should POST an user to get the token ', (done) => {

      chai.request(server)
      .post('/api/authenticate')
      .send({username: 'auth', password: 'auth'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('ok');
        res.body.should.have.property('token');

        done();
      });
    });

    it('should fail with incorrect user', (done) => {
      chai.request(server)
      .post('/api/authenticate')
      .send({username: 'no', password: 'auth'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fail');

        done();
      });
    });

    it('should fail with incorrect password', (done) => {
      chai.request(server)
      .post('/api/authenticate')
      .send({username: 'auth', password: 'no'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fail');

        done();
      });
    });
    it('should fail without user', (done) => {
      chai.request(server)
      .post('/api/authenticate')
      .send({password: 'auth'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fail');

        done();
      });
    });

    it('should fail without password', (done) => {
      chai.request(server)
      .post('/api/authenticate')
      .send({username: 'auth'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fail');
        done();
      });
    });

    it('should fail without user/password', (done) => {
      chai.request(server)
      .post('/api/authenticate')
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fail');

        done();
      });
    });
  });
});

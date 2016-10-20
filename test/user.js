let mongoose = require("mongoose");

let User = require('../app_back/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users (/api/users/)', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe('/GET', () => {
    it('GET all the users', (done) => {
      chai.request(server)
      .get('/api/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  describe('/POST ', () => {
    it('should not POST an user without username field', (done) => {
      let user = {
        name: 'Antonio',
        password: 'antonio'
      }
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('username');
        res.body.errors.username.should.have.property('kind').eql('required');
        done();
      });
    });
    it('POST an user ', (done) => {
      let user = {
        name: 'Antonio',
        password: 'antonio',
        username: 'antonio'
      }

      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('ok');
        done();
      });
    });
  });


  describe('/GET/:user_id', () => {
    it('should GET a user by the given id', (done) => {
      let user = new User({
          name: 'Antonio',
          password: 'antonio',
          username: 'antonio'
      });

      user.save((err, user) => {
        chai.request(server)
        .get('/api/users/' + user._id)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(user.name);;
          done();
        });
      });
    })
  });

  describe('/PUT/:user_id', () => {
    it('it should UPDATE a user given the id', (done) => {
      let user = new User({
          name: 'Antonio',
          password: 'antonio',
          username: 'antonio'
      });

      user.save((err, user) => {
        chai.request(server)
        .put('/api/users/' + user._id)
        .send({name: "TEST"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('ok');
          res.body.user.should.have.property('name').eql('TEST');
          done();
        });
      });
    });
  });


  describe('/DELETE/:user_id', () => {
    it('should DELETE a user given the id', (done) => {
      let user = new User({
          name: 'Antonio',
          password: 'antonio',
          username: 'antonio'
      });

      user.save((err, user) => {
        chai.request(server)
        .delete('/api/users/' + user._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('ok');
          done();
        });
      });
    });
  });

});

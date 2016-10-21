let mongoose = require("mongoose");

let User = require('../app_back/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Auth (/api/authenticate)', () => {
  beforeEach((done) => {
    User.remove({});
    done();
  });

  describe('/POST ', () => {
    it('should POST an user to get the token ', (done) => {

      var user = new User({username: 'auth',password: 'auth'});
      User.remove({_id: user._id});
      user.save();

      chai.request(server)
      .post('/api/authenticate')
      .send({username: 'mov', password: 'mov'})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('ok');
        res.body.should.have.property('token');

        done();
      });
    });
  });
});

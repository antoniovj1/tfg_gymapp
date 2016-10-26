let mongoose = require("mongoose");

let Session = require('../app/models/training_session');
let Movement = require('../app/models/movement');
let Exercise = require('../app/models/exercise');
let User = require('../app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect();


chai.use(chaiHttp);

var user = new User({username: 'ex',password: 'ex'});
User.remove({_id: user._id});
user.save();

// Primero autenticación
chai.request(server)
.post('/api/authenticate')
.send({username: 'ex', password: 'ex'})
.end((err, res) => {
  var token = res.body.token

  describe('Exercise (/api/training/exercise/)', () => {

    before((done) => {
      Exercise.remove({});
      Session.remove({});
      Movement.remove({});
      done();
    });

    after((done) => {
      User.remove({_id: user._id});
      done();
    });

    describe('/GET/:id_exercise', () => {
      it('should GET the exercise given the exercise id', (done) => {
        let exercise = new Exercise();

        exercise.save((err, exercise) => {
          chai.request(server)
          .get('/api/training/exercise/' + exercise._id)
          .set('x-access-token',token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            chai.expect(res.body).to.contain.keys("_id");
            done();
          });
        });
      })

      it('should fail with incorrect id', (done) => {
        let exercise = new Exercise();

        exercise.save((err, exercise) => {
          chai.request(server)
          .get('/api/training/exercise/'+'ididididid')
          .set('x-access-token',token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('fail');
            done();
          });
        });
      })
    });

    describe('/POST ', () => {
      let movement = new Movement({
        name : "Dominadas",
        material : "Barra",
        muscles :[{name:"bicep",percentage:20},
        {name:"pecho",percentage:10},
        {name:"dorsal",percentage:60},
        {name:"abdominales",percentage:10}]
      });

      let session = new Session({user: user._id});

      movement.save();
      session.save();

      it('should POST an exercise ', (done) => {
        chai.request(server)
        .post('/api/training/exercise/')
        .set('x-access-token',token)
        .send({movement: movement , session: session })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('ok');

          done();
        });
      });
      it('should no POST an exercise without movement', (done) => {
        chai.request(server)
        .post('/api/training/exercise/')
        .set('x-access-token',token)
        .send({session: session })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('fail');

          done();
        });
      });
      it('should no POST an exercise without session', (done) => {
        chai.request(server)
        .post('/api/training/exercise/')
        .set('x-access-token',token)
        .send({movement: movement})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('fail');

          done();
        });
      });
      it('should no POST an exercise without movement/session', (done) => {
        chai.request(server)
        .post('/api/training/exercise/')
        .set('x-access-token',token)
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('fail');

          done();
        });
      });
    });


    describe('/DELETE/:id_exercise', () => {
      it('should DELETE a exercise given the id', (done) => {
        let exercise = new Exercise();

        exercise.save((err, exercise) => {
          chai.request(server)
          .delete('/api/training/exercise/' + exercise._id)
          .set('x-access-token',token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('ok');
            done();
          });
        });
      });
      it('should fail with incorrect id', (done) => {
        let exercise = new Exercise();

        exercise.save((err, exercise) => {
          chai.request(server)
          .delete('/api/training/exercise/' + 'ididididid')
          .set('x-access-token',token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('fail');
            done();
          });
        });
      });

    });
  });
});

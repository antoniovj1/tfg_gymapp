let mongoose = require("mongoose");

let Set = require('../app_back/models/set');
let Exercise = require('../app_back/models/exercise');
let User = require('../app_back/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

var user = new User({username: 'set',password: 'set'});
User.remove({_id: user._id});
user.save();

// Primero autenticación
chai.request(server)
.post('/api/authenticate')
.send({username: 'set', password: 'set'})
.end((err, res) => {
  var token = res.body.token

  describe('Set (/api/training/set/)', () => {

    beforeEach((done) => {
      Set.remove({});
      Exercise.remove({});
      done();
    });

    describe('/GET/:id_exercise', () => {

      it('should GET the sets given the exercise id', (done) => {
        let exercise = new Exercise();

        exercise.save((err, exercise) => {
          chai.request(server)
          .get('/api/training/movements/' + exercise._id)
          .set('x-access-token',token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
        });
      })
    });

    describe('/POST/:id_exercise', () => {
      it('should POST a set given the exercise id', (done) => {
        let set = {
          repetitions: 10,
          weight: 80,
          rest:60
        }

        let exercise = new Exercise();

        chai.request(server)
        .post('/api/training/set/' + exercise._id)
        .set('x-access-token',token)
        .send(set)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('ok');

          done();
        });
      });

    });

    describe('/GET/byId/:id_set', () => {
      it('should GET a set by the given id', (done) => {
        let ex = new Exercise();

        let set = new Set({
          repetitions: 10,
          weight: 80,
          rest:60,
          exercise: ex._id
        });

        set.save((err, set) => {
          chai.request(server)
          .get('/api/training/set/byId/' + set._id)
          .set('x-access-token',token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('repetitions').equal(set.repetitions);
            res.body.should.have.property('weight').equal(set.weight);
            done();
          });
        });
      })
    });

    describe('/PUT/byId/:id_set', () => {
      it('it should UPDATE a set given the id', (done) => {
        let ex = new Exercise();

        let set = new Set({
          repetitions: 10,
          weight: 80,
          rest:60,
          exercise: ex._id
        });

        set.save((err, set) => {
          chai.request(server)
          .put('/api/training/set/byId/' + set._id)
          .set('x-access-token',token)
          .send({repetitions: "99"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('ok');
            res.body.set.should.have.property('repetitions').eql(99);
            done();
          });
        });
      });
    });


    describe('/DELETE/byId/:id_set', () => {
      it('should DELETE a set given the id', (done) => {
        let ex = new Exercise();

        let set = new Set({
          repetitions: 10,
          weight: 80,
          rest:60,
          exercise: ex._id
        });

        set.save((err, set) => {
          chai.request(server)
          .delete('/api/training/set/byId/' + set._id)
          .set('x-access-token',token)
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
});

let mongoose = require("mongoose");

let Session = require('../app_back/models/training_session');
let Movement = require('../app_back/models/movement');
let Exercise = require('../app_back/models/exercise');
let User = require('../app_back/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

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
    beforeEach((done) => {
      Exercise.remove({});
      Session.remove({});
      Movement.remove({});
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

    describe('/POST ', () => {
      it('should POST an exercise ', (done) => {

       let movement = new Movement({
          name : "Dominadas",
          material : "Barra",
          muscles :[{name:"bicep",percentage:20},
                    {name:"pecho",percentage:10},
                    {name:"dorsal",percentage:60},
                    {name:"abdominales",percentage:10}]
        });

        let session = new Session();

        movement.save();
        session.save();

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
    });
  });
});

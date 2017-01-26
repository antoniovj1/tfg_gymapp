let mongoose = require("mongoose");

let Movement = require('../app/models/movement');
let User = require('../app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

var user = new User({username: 'mov',password: 'mov'});
User.remove({_id: user._id});
user.save();

// Primero autenticación
chai.request(server)
.post('/api/authenticate')
.send({username: 'mov', password: 'mov'})
.end((err, res) => {
  var token = res.body.token


  describe('Movement (/api/training/movements/)', () => {
    beforeEach((done) => {
      Movement.remove({}, (err) => {
        done();
      });
    });

    after((done) => {
      User.remove({_id: user._id});
      done();
    });

    describe('/GET movement', () => {
      it('GET all the movements', (done) => {
        chai.request(server)
        .get('/api/training/movements')
        .set('x-access-token',token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
      });
    });

    describe('/POST movement', () => {
      it('should not POST a movement without name field', (done) => {
        let movement = {
          material : "Barra",
          muscles :[{name:"bicep",percentage:20},
                    {name:"pecho",percentage:10},
                    {name:"dorsal",percentage:60},
                    {name:"abdominales",percentage:10}]
        }
        chai.request(server)
        .post('/api/training/movements')
        .set('x-access-token',token)
        .send(movement)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        });
      });

      it('POST a movement ', (done) => {
        let movement = {
          name : "Dominadas",
          material : "Barra",
          muscles :[{name:"bicep",percentage:20},
                    {name:"pecho",percentage:10},
                    {name:"dorsal",percentage:60},
                    {name:"abdominales",percentage:10}]
        }
        chai.request(server)
        .post('/api/training/movements')
        .set('x-access-token',token)
        .send(movement)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('ok');
          res.body.movement.should.have.property('name');
          res.body.movement.should.have.property('material');
          res.body.movement.should.have.property('muscles');
          done();
        });
      });
    });

    describe('/GET/:name', () => {
      it('should GET a movement by the given name', (done) => {
        let movement = new Movement({
          name : "Dominadas",
          material : "Barra",
          muscles :[{name:"bicep",percentage:20},
                    {name:"pecho",percentage:10},
                    {name:"dorsal",percentage:60},
                    {name:"abdominales",percentage:10}]
        });

        movement.save((err, movement) => {
          chai.request(server)
          .get('/api/training/movements/' + movement.name)
          .set('x-access-token',token)
          .send(movement)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.movement.should.have.property('name').eql(movement.name);;
            res.body.movement.should.have.property('material');
            res.body.movement.should.have.property('muscles');
            done();
          });
        });
      })
    });

    describe('/PUT/:name', () => {
      it('it should UPDATE a movement given the name', (done) => {
        let movement = new Movement({
          name : "Dominadas",
          material : "Barra",
          muscles :[{name:"bicep",percentage:20},
                    {name:"pecho",percentage:10},
                    {name:"dorsal",percentage:60},
                    {name:"abdominales",percentage:10}]
        });
        movement.save((err, movement) => {
          chai.request(server)
          .put('/api/training/movements/' + movement.name)
          .set('x-access-token',token)
          .send({name: "Dominadas TEST", material: "test"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('ok');
            res.body.movement.should.have.property('material').eql('test');
            done();
          });
        });
      });
    });


    describe('/DELETE/:name', () => {
      it('should DELETE a movement given the name', (done) => {
        let movement = new Movement({
          name : "Dominadas",
          material : "Barra",
          muscles :[{name:"bicep",percentage:20},
                    {name:"pecho",percentage:10},
                    {name:"dorsal",percentage:60},
                    {name:"abdominales",percentage:10}]
        });

        movement.save((err, movement) => {
          chai.request(server)
          .delete('/api/training/movements/' + movement.name)
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

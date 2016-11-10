let mongoose = require("mongoose");

let Exercise = require('../app/models/exercise');
let User = require('../app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

var user = new User({ username: 'set', password: 'set' });
User.remove({ _id: user._id });
user.save();

// Primero autenticación
chai.request(server)
    .post('/api/authenticate')
    .send({ username: 'set', password: 'set' })
    .end((err, res) => {
        var token = res.body.token

        describe('Set (/api/training/set/)', () => {

            beforeEach((done) => {
                Exercise.remove({});
                done();
            });

            after((done) => {
                User.remove({ _id: user._id });
                done();
            });

            describe('/GET/:id_exercise', () => {

                it('should GET the sets given the exercise id', (done) => {
                    let exercise = new Exercise();

                    exercise.save((err, exercise) => {
                        chai.request(server)
                            .get('/api/training/exercise/' + exercise._id + '/set')
                            .set('x-access-token', token)
                            .end((err, res) => {

                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('message').eql('ok');
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
                        rest: 60
                    }

                    let exercise = new Exercise();
                    exercise.save();

                    chai.request(server)
                        .post('/api/training/exercise/' + exercise._id + '/set')
                        .set('x-access-token', token)
                        .send(set)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('ok');

                            done();
                        });
                });

            });

            describe('/GET/:id_exercise/:num', () => {
                it('should GET a set by the given exercise id and num', (done) => {
                    let ex = new Exercise();

                    let set = {
                        repetitions: 10,
                        weight: 80,
                        rest: 60
                    }

                    ex.sets.push(set);
                    ex.save();

                    chai.request(server)
                        .get('/api/training/exercise/' + ex._id + '/set/0')
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.set.should.have.property('repetitions').equal(set.repetitions);
                            res.body.set.should.have.property('weight').equal(set.weight);
                            done();
                        });
                })
            });

            describe('/PUT/byId/:id_set', () => {
                it('it should UPDATE a set given the exercise and num', (done) => {
                    let ex = new Exercise();

                    let set = {
                        repetitions: 10,
                        weight: 80,
                        rest: 60
                    }

                    let set2 = {
                        repetitions: 100,
                        weight: 800,
                        rest: 600
                    }

                    ex.sets.push(set);
                    ex.save();

                    chai.request(server)
                        .put('/api/training/exercise/' + ex._id + '/set/0')
                        .set('x-access-token', token)
                        .set(set2)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('message').eql('ok');
                            done();
                        });
                })
            });


            describe('/DELETE/byId/:id_set', () => {
                it('should DELETE a set given the exercise and num', (done) => {
                    let ex = new Exercise();

                    let set = {
                        repetitions: 10,
                        weight: 80,
                        rest: 60
                    }

                    ex.sets.push(set);
                    ex.save();

                    chai.request(server)
                        .delete('/api/training/exercise/' + ex._id + '/set/0')
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property('message').eql('ok');

                            done();
                        });
                })
            });
        });
    });

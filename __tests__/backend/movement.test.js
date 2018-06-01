const config = require('../../config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Movement = require('../../backend/models/movement');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { token } = config;

jest.setTimeout(30000);

describe('Movement (/api/training/movements/)', () => {
  let server;

  beforeAll(async () => {
    server = require('../../server');
    await Movement.remove({});
  });

  beforeEach(async () => {
    server = require('../../server');
    await Movement.remove({});
  });

  afterAll(async () => {
    try {
      await Movement.remove({});
      await mongoose.disconnect();
      await server.shutdown();
    } catch (error) {
      console.log(` ${error} `);
      throw error;
    }
  });

  describe('/GET movement', () => {
    test('GET all the movements', done => {
      chai
        .request(server)
        .get('/api/training/movements')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).toHaveLength(0);
          done();
        });
    });
  });

  describe('/POST movement', () => {
    test('should not POST a movement without name field', done => {
      const movement = {
        material: 'Barra',
        muscles: [
          { name: 'bicep', percentage: 20 },
          { name: 'pecho', percentage: 10 },
          { name: 'dorsal', percentage: 60 },
          { name: 'abdominales', percentage: 10 }
        ]
      };
      chai
        .request(server)
        .post('/api/training/movements')
        .set('x-access-token', token)
        .send(movement)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('errors');
          expect(res.body.errors).toHaveProperty('name');
          expect(res.body.errors.name).toHaveProperty('kind', 'required');
          done();
        });
    });

    test('POST a movement ', done => {
      const movement = {
        name: 'Dominadas',
        material: 'Barra',
        muscles: [
          { name: 'bicep', percentage: 20 },
          { name: 'pecho', percentage: 10 },
          { name: 'dorsal', percentage: 60 },
          { name: 'abdominales', percentage: 10 }
        ]
      };
      chai
        .request(server)
        .post('/api/training/movements')
        .set('x-access-token', token)
        .send(movement)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('message', 'ok');
          expect(res.body.movement).toHaveProperty('name');
          expect(res.body.movement).toHaveProperty('material');
          expect(res.body.movement).toHaveProperty('muscles');
          done();
        });
    });
  });

  describe('/GET/:name', () => {
    test('should GET a movement by the given name', done => {
      const movement = new Movement({
        name: 'Dominadas',
        material: 'Barra',
        muscles: [
          { name: 'bicep', percentage: 20 },
          { name: 'pecho', percentage: 10 },
          { name: 'dorsal', percentage: 60 },
          { name: 'abdominales', percentage: 10 }
        ]
      });

      movement.save(err => {
        chai
          .request(server)
          .get(`/api/training/movements/${movement.name}`)
          .set('x-access-token', token)
          .send()
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body.movement).toHaveProperty('name', movement.name);
            expect(res.body.movement).toHaveProperty('material');
            expect(res.body.movement).toHaveProperty('muscles');
            done();
          });
      });
    });

    test('should fail GET a movement with wrong name', done => {
      chai
        .request(server)
        .get(`/api/training/movements/nnnnnnnn`)
        .set('x-access-token', token)
        .send()
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('message', 'fail');
          done();
        });
    });
  });

  describe('/PUT/:name', () => {
    test('it should UPDATE a movement given the name', done => {
      const movement = new Movement({
        name: 'Dominadas',
        material: 'Barra',
        muscles: [
          { name: 'bicep', percentage: 20 },
          { name: 'pecho', percentage: 10 },
          { name: 'dorsal', percentage: 60 },
          { name: 'abdominales', percentage: 10 }
        ]
      });
      movement.save(err => {
        chai
          .request(server)
          .put(`/api/training/movements/${movement.name}`)
          .set('x-access-token', token)
          .send({ name: 'Dominadas TEST', material: 'test' })
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body).toHaveProperty('message', 'ok');
            expect(res.body.movement).toHaveProperty('material', 'test');
            done();
          });
      });
    });
  });

  describe('/DELETE/:name', () => {
    test('should DELETE a movement given the name', done => {
      const movement = new Movement({
        name: 'Dominadas',
        material: 'Barra',
        muscles: [
          { name: 'bicep', percentage: 20 },
          { name: 'pecho', percentage: 10 },
          { name: 'dorsal', percentage: 60 },
          { name: 'abdominales', percentage: 10 }
        ]
      });

      movement.save(err => {
        chai
          .request(server)
          .delete(`/api/training/movements/${movement.name}`)
          .set('x-access-token', token)
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(typeof res.body).toBe('object');
            expect(res.body).toHaveProperty('message', 'ok');
            done();
          });
      });
    });

    test('should fail DELETE without movement', done => {
      chai
        .request(server)
        .delete(`/api/training/movements/no_movement`)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status).toBe(200);
          expect(typeof res.body).toBe('object');
          expect(res.body).toHaveProperty('message', 'fail');
          done();
        });
    });
  });
});

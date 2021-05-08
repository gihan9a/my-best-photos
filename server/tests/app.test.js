const request = require('supertest');
const { describe, test } = require('@jest/globals');
const app = require('../app');

describe('Test application', () => {
  test('smoke test', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, '"ok"')
      .end(done);
  });

  test('photos api', (done) => {
    request(app)
      .get('/photos')
      .expect('Content-Type', /json/)
      .expect(200, [])
      .end(done);
  });
});

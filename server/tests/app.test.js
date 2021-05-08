const request = require('supertest');
const { describe, test } = require('@jest/globals');
const app = require('../app');

describe('Test application', () => {
  test('smoke test', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('"ok"')
      .end(done);
  });
});

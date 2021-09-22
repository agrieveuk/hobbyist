const request = require('supertest');
const seedData = require('../seed/test-seed.js');
const app = require('../app.js');
const mongoose = require('mongoose');
require('jest-sorted');

jest.setTimeout(30000);

beforeEach(() => {
  return seedData();
});
afterAll(() => mongoose.connection.close());

describe('/api/businessUsers/:username', () => {
  describe('/GET', () => {
    it('200: returns an array of objects representing businessUser', async () => {
      const { body } = await request(app).get('/api/businessUsers/Meda_Feeney56').expect(200);

      expect(body.businessUser).toBeInstanceOf(Array);
      expect(body.businessUser[0].username).toEqual('Meda_Feeney56');
      expect(body.businessUser[0]).toMatchObject({
        address: expect.any(Object),
        location: expect.any(Object),
        username: expect.any(String),
        email: expect.any(String),
        phoneNumber: expect.any(Number),
        password: expect.any(String),
        website: expect.any(String),
        name: expect.any(String),
        imageURL: expect.any(String),
        clubs: expect.any(Array),
        reviews: expect.any(Array)
      });
    });
    test('Error 400: responds with an error message when passed invalid username', async () => {
      await request(app)
        .get('/api/businessUsers/notUsername')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
  });
  describe('/PATCH', () => {
    test('PATCH 200: responds with the updates in businessUser', async () => {
      const updates = { 
        email: 'Meda_Feeney56@hotmail.com',
        phoneNumber: 7234543654,
        password: 'somehingNew9'
      };
      await request(app)
        .patch('/api/businessUsers/Meda_Feeney56')
        .send(updates)
        .expect(200)
        .then(({ body }) => {
          expect(body.businessUser).toMatchObject({
            address: expect.any(Object),
            location: expect.any(Object),
            username: expect.any(String),
            email: 'Meda_Feeney56@hotmail.com',
            phoneNumber: 7234543654,
            password: 'somehingNew9',
            website: expect.any(String),
            name: expect.any(String),
            imageURL: expect.any(String),
            clubs: expect.any(Array),
            reviews: expect.any(Array)
          });
        });
    });
  });
});


describe('/api/users/:username', () => {
  describe('/GET', () => {
    it('200: returns an array of objects representing user', async () => {
      const { body } = await request(app).get('/api/users/Elias72').expect(200);

      expect(body.user).toBeInstanceOf(Array);
      expect(body.user[0].username).toEqual('Elias72');
      expect(body.user[0]).toMatchObject({
        address: expect.any(Object),
        location: expect.any(Object),
        username: expect.any(String),
        name: expect.any(String),
        password: expect.any(String),
        imageURL: expect.any(String),
        email: expect.any(String),
        age13: expect.any(Boolean)
      });
    });
    test('Error 400: responds with an error message when passed invalid username', async () => {
      await request(app)
        .get('/api/users/notUsername')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Sorry, that is bad request');
        });
    });
  });
  describe('/PATCH', () => {
    test('PATCH 200: responds with the updates in user', async () => {
      const updates = { 
        address: { firstLine: '7 King St', postcode: 'M2 4DL' },
        password: 'somehingNew9'
      };
      await request(app)
        .patch('/api/users/Elias72')
        .send(updates)
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
            address: { firstLine: '7 King St', postcode: 'M2 4DL' },
            location: expect.any(Object),
            username: expect.any(String),
            name: expect.any(String),
            password: 'somehingNew9',
            imageURL: expect.any(String),
            email: expect.any(String),
            age13: expect.any(Boolean)
          });
        });
    });
  });
});

const supertest = require('supertest');
const request = supertest('http://localhost:3000/api');

test('connect: check connect and response OK 200', async () => {
  const response = await request.get('/stations')
                                .set('Accept', 'application/json');
  expect(response.status).toEqual(200);
});

test('bici-api: check body response rows equal to 0', async () => {
  const { body:{ data } } = await request.get('/stations');
  expect(data).toHaveLength(0);
});

test('bici-api: check body response rows is greater than 1', async () => {
  const latitude = 20.666378,
        longitude = -103.34882, 
        distance = 1000;

  const { body:{ data } } = await request.get(`/stations?latitude=${latitude}&longitude=${longitude}&distance=${distance}`);

  expect(data.length).toBeGreaterThanOrEqual(1);
});
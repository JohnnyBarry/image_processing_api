import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test Endpoint Resource', () => {
  it('Gets the api/images endpoint', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(200);
  });

  it('Filename Parameter Is Required', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('filename param is required!');
  });

  it('Width Must Be A Number.', async () => {
    const response = await request.get(
      '/api/images?filename=test&width=123k&height=200'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Width Must Be A Number!');
  });

  it('Height Must Be A Number.', async () => {
    const response = await request.get(
      '/api/images?filename=test&width=200&height=200t'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Height Must Be A Number!');
  });

  it('Height Param Must Be Passed When Using Width.', async () => {
    const response = await request.get('/api/images?filename=test&width=200');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'Height Param Must Be Passed When Using Width!'
    );
  });

  it('Width Param Must Be Passed When Using Height.', async () => {
    const response = await request.get('/api/images?filename=test&height=200');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      'Width Param Must Be Passed When Using Height!'
    );
  });
});

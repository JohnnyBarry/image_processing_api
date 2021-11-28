import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test Endpoint Resource', () => {
  it('gets the api/images endpoint', async (done) => {
    const response = await request.get('/api/images?filename=test');
    expect(response.status).toBe(200);
    done();
  });

  it('filename parameter is required', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('filename is required!');
  });

  it('gets the api/images endpoint', async () => {
    const response = await request.get('/api/images?filename=test&width=123k');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('width must be a number!');
  });

  it('gets the api/images endpoint', async () => {
    const response = await request.get(
      '/api/images?filename=test&width=200&height=200t'
    );
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('height must be a number!');
  });
});

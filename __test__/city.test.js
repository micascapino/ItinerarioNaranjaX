describe('Get /cities/cities', () => {
    it('Return all cities', async () => {
    const response = await request(app).get('/cities/cities')
    expect(response.status).toBe(200)
    expect(response.body.ok).toBe(true)
    expect(response.body.total).toBe(15)
    expect(response.body).not.toBeNull()
    expect(Array.isArray(response.body.cities)).toBe(true)
    });
    });

const request = require('supertest')
const { app } = require('../app')
let testServer
beforeAll(() => {
    testServer = app.listen(4000)
});
afterAll((done) => {
    testServer.close(done)
})
    
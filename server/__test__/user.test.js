describe("Get /users/users", () => {
    it("Return all users", async () => {
        const response = await request(app).get("/users/users");
        expect(response.status).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(response.body.total).toBe(2);
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body.users)).toBe(true);
    });
});

const request = require("supertest");
const { app } = require("../app");
let testServer;
beforeAll(() => {
    testServer = app.listen(4000);
});
afterAll((done) => {
    testServer.close(done);
});
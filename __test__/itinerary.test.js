describe("Get /itineraries/itineraries", () => {
    it("Return all itineraries", async () => {
        const response = await request(app).get("/itineraries/itineraries");
        expect(response.status).toBe(200);
        expect(response.body.ok).toBe(true);
        expect(response.body.total).toBe(1);
        expect(response.body).not.toBeNull();
        expect(Array.isArray(response.body.itineraries)).toBe(true);
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
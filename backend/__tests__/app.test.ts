import request from "supertest";
import app from "../src/app";

describe("App Route", () => {
  it("should return 200 on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Welcome to the API!");
  });
});

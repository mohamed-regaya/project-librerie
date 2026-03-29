import request from "supertest";
import app from "../app.js"; // your express app
import mongoose from "mongoose";
jest.setTimeout(20000);
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/my_database");
});
describe("Auth API", () => {
  // TEST REGISTER
  it("should register and login a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      full_name: "test user",
      email: "test@test.com",
      password: "123456",
      address: "Paris",
      role: "worker",
    });

    const res2 = await request(app).post("/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });
    console.log(res2);
    //expect(res2.statusCode).toBe(200);

    expect(res2.body.result).toBeDefined();
  });
});

import request from "supertest";
import server from "../app.js";
import mongoose from "mongoose";
//testing get all
jest.setTimeout(20000);

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/my_database");
});

describe("API test", () => {
  test("GET /products should respond", async () => {
    console.log("database connection status", mongoose.connection.readyState);
    let result = await request(server).get("/products/get_all_products");
    console.log(result.body);
    expect(result.statusCode).toBe(200);
  });
});

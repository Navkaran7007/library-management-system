import request from "supertest";
import app from "../src/app"; 

describe("User endpoints", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Users retrieved");
  });

  it("should return 404 if user not found", async () => {
    const res = await request(app).get("/api/v1/users/7007");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
});
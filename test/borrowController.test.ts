import request from "supertest";
import app from "../src/app"; 

describe("Borrow endpoints", () => {
  let borrowId: string;

  it("should return all borrow records", async () => {
    const res = await request(app).get("/api/v1/borrow");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Borrow records retrieved");
  });

  it("should create a new borrow record", async () => {
    const res = await request(app)
      .post("/api/v1/borrow")
      .send({ bookId: "book1", userId: "user1" });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Book borrowed successfully");
    expect(res.body.data).toHaveProperty("id");

    borrowId = res.body.data.id;
  });

  it("should return a borrowed book", async () => {
    const res = await request(app)
      .post("/api/v1/return")
      .send({ borrowId });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Book returned successfully");
    expect(res.body.data.status).toBe("RETURNED");
  });
});

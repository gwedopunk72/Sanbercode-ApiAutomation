const { expect } = require("chai");
const request = require("supertest");
const data = require('../data/products.js');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwZWVlYTAwLWUxMTEtNGY0OS05ZWIzLWI0MjNlNmY0MDE4NSIsImNvbXBhbnlJZCI6ImIyNTZlYWU0LWQzNzAtNGU1Ny1iNGI3LWVmYWNlNzZhMTdmNSIsImlhdCI6MTY3NjYzMDg2M30.hKx-nMbLpet0lA3N5WoJw9kCj_bkeipdmtfnoYTWJSM"
const baseUrl = "https://kasir-api.belajarqa.com"
const testData = data.Add_Products

describe("POST - Add New Product", () => {
  it("Success to add new product", async () => {
    const response = request(baseUrl)
      .post("/products") //http method + 
      .set({
        "Authorization": `Bearer ${token}`
      })
      .send(testData);
      //assert response body
      expect((await response).status).to.equal(201);
      expect((await response).body.status).to.equal("success");
  });
});

describe("Add Product without Authorization token", () => {
  it("Add new product without token", async () => {
    const response = request(baseUrl)
      .post("/products") //http method + 
      .send(testData);
      //assert response body
      expect((await response).status).to.equal(401);
      expect((await response).body.error).to.equal("Unauthorized");          
    });
});  
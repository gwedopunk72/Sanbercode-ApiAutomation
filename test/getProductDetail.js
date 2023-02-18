const { expect } = require("chai");
const request = require("supertest");
const data = require('../data/products.js');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwZWVlYTAwLWUxMTEtNGY0OS05ZWIzLWI0MjNlNmY0MDE4NSIsImNvbXBhbnlJZCI6ImIyNTZlYWU0LWQzNzAtNGU1Ny1iNGI3LWVmYWNlNzZhMTdmNSIsImlhdCI6MTY3NjYzMDg2M30.hKx-nMbLpet0lA3N5WoJw9kCj_bkeipdmtfnoYTWJSM"
const baseUrl = "https://kasir-api.belajarqa.com"
const productID = data.Add_Products.category_id
const validID = "91e24ce0-dcd5-4484-ad4d-f1846d677efc"

describe("GET - Product Detail with productID", () => {
  it("Success get product detail", async () => {
    const response = request(baseUrl)
      .get("/products/"+validID)
      .set({
        "Authorization": `Bearer ${token}`
      })
      expect((await response).status).to.equal(200);
      expect((await response).body.status).to.equal("success")
      expect((await response).body.data.product.code).to.equal("A314ASDDFIER3432");
  });
});

describe("GET - Product Detail with invalid productID", () => {
  it("Fail get product detail", async () => {
    const response = request(baseUrl)
      .get("/products/"+productID)
      .set({
        "Authorization": `Bearer ${token}`
      })
      expect((await response).status).to.equal(404);
      expect((await response).body.status).to.equal("fail")
      expect((await response).body.message).to.equal("Product tidak ditemukan");
  });
});
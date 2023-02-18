const { expect } = require("chai");
const request = require("supertest");
const data = require('../data/products.js');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwZWVlYTAwLWUxMTEtNGY0OS05ZWIzLWI0MjNlNmY0MDE4NSIsImNvbXBhbnlJZCI6ImIyNTZlYWU0LWQzNzAtNGU1Ny1iNGI3LWVmYWNlNzZhMTdmNSIsImlhdCI6MTY3NjYzMDg2M30.hKx-nMbLpet0lA3N5WoJw9kCj_bkeipdmtfnoYTWJSM"
const baseUrl = "https://kasir-api.belajarqa.com"
const updateData = data.Update_Product
const invalidPrice = data.Update_Invalid_Price
const validID = "91e24ce0-dcd5-4484-ad4d-f1846d677efc"

describe("PUT - Update Product", () => {
  it("Success to update product", async () => {
    const response = request(baseUrl)
      .put("/products/"+validID)
      .set({
        "Authorization": `Bearer ${token}`
      })
      .send(updateData)
      expect((await response).status).to.equal(200);
      expect((await response).body.status).to.equal("success")
      expect((await response).body.message).to.equal("Product berhasil diupdate");
      expect((await response).body.data.name).to.equal("Chitato");
  });
});

describe("PUT - Update Product with invalid price", () => {
  it("Fail to update product price", async () => {
    const response = request(baseUrl)
      .put("/products/"+validID)
      .set({
        "Authorization": `Bearer ${token}`
      })
      .send(invalidPrice)
      expect((await response).status).to.equal(400);
      expect((await response).body.status).to.equal("fail")
      expect((await response).body.message).to.equal("\"price\" must be a number");
  });
});
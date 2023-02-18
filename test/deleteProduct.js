const { expect } = require("chai");
const request = require("supertest");
const data = require('../data/products.js');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMwZWVlYTAwLWUxMTEtNGY0OS05ZWIzLWI0MjNlNmY0MDE4NSIsImNvbXBhbnlJZCI6ImIyNTZlYWU0LWQzNzAtNGU1Ny1iNGI3LWVmYWNlNzZhMTdmNSIsImlhdCI6MTY3NjYzMDg2M30.hKx-nMbLpet0lA3N5WoJw9kCj_bkeipdmtfnoYTWJSM"
const baseUrl = "https://kasir-api.belajarqa.com"
const validID = "362779ad-c39f-46d3-a1de-7371e761bb0b"
const invalidID = "xxx"

describe("DELETE - Deleting Product", () => {
  it("Success to delete product", async () => {
    const response = request(baseUrl)
      .delete("/products/"+validID)
      .set({
        "Authorization": `Bearer ${token}`
      })
      expect((await response).status).to.equal(200);
      expect((await response).body.status).to.equal("success")
      expect((await response).body.message).to.equal("Product berhasil dihapus");
  });
});

describe("DELETE - Delete invalid productID", () => {
  it("Fail to delete product with invalid id", async () => {
    const response = request(baseUrl)
      .delete("/products/"+invalidID)
      .set({
        "Authorization": `Bearer ${token}`
      })
      expect((await response).status).to.equal(404);
      expect((await response).body.status).to.equal("fail")
      expect((await response).body.message).to.equal("id tidak valid");
  });
});
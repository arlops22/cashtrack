describe("Transactions Module", () => {
  describe("GET /bank-accounts/:id/transactions", () => {
    it("should list transactions without error", () => {});
    it("should throw unauthorized error when the bank account is not the owner of the provided transaction", () => {});
  });

  describe("POST /bank-accounts/:id/transactions", () => {
    it("should create a transaction without error", () => {});
    it("should update bank account current balance without error", () => {});
    it("should throw validation error when invalid data is provided", () => {});
    it("should throw unauthorized error when the bank account is not the owner of the provided transaction", () => {});
    it("should throw unauthorized error when the transaction is not the owner of the provided category", () => {});
  });

  describe("PATCH /bank-accounts/:id/transactions/:id", () => {
    it("should update a transaction without error", () => {});
    it("should update bank account current balance without error", () => {});
    it("should throw validation error when invalid data is provided", () => {});
    it("should throw unauthorized error when the bank account is not the owner of the provided transaction", () => {});
    it("should throw unauthorized error when the transaction is not the owner of the provided category", () => {});
  });

  describe("DELETE /bank-accounts/:id/transactions/:id", () => {
    it("should delete a transaction without error", () => {});
    it("should update bank account current balance without error", () => {});
    it("should throw unauthorized error when the bank account is not the owner of the provided transaction", () => {});
  });

  describe("GET /bank-accounts/:id/transactions/metrics", () => {
    it("should return the transactions metrics without error", () => {});
    it("should throw unauthorized error when the bank account is not the owner of the provided transaction", () => {});
  });
});
